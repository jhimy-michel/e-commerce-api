import {bind, BindingScope} from '@loopback/core';
import {repository} from '@loopback/repository';
import * as bcrypt from 'bcryptjs';
import {User} from '../models';
import {CustomProfile} from '../models/auth/user-profile.model';
import {UserRepository} from '../repositories';
import {AuthProblemInvalidCredentials, BlockedAccount} from './constants/auth.errors';

const sleep = require('util').promisify(setTimeout);

// object defined for login fields
export type Credentials = {
  email: string;
  password: string;
};

@bind({scope: BindingScope.TRANSIENT})
export class AuthService {
  constructor(
    @repository(UserRepository)
    public userRepository: UserRepository
  ) {}

  /*
   * Add service methods here
   */

  async verifyCredentials(credentials: Credentials): Promise<User> {
    // sleep 1 second before processing the login request
    await sleep(1000);

    const foundUser = await this.userRepository.findOne({
      where: {email: credentials.email}
    });

    if (!foundUser) {
      throw new AuthProblemInvalidCredentials();
    }

    if (foundUser?.loginAttemps && foundUser?.loginAttemps > 10) {
      await this.validateUserBlockTimeout(foundUser.email);
      throw new BlockedAccount();
    }

    const validPassword = bcrypt.compareSync(credentials.password, foundUser.password);

    if (!validPassword) {
      await this.increaseFailureCounter(foundUser.email);
      throw new AuthProblemInvalidCredentials();
    }

    // resets loginAttemps counter
    await this.userRepository.updateById(foundUser._id, {
      loginAttemps: 0,
      lastLoginDate: Date.now()
    });

    return foundUser;
  }
  /**
   * Validates if one minute has passed since last failure login.
   * @param email
   */
  async validateUserBlockTimeout(email: string): Promise<void> {
    const user = await this.userRepository.findOne({
      where: {email: email}
    });

    if (user?.lastLoginDate) {
      const lastLoginDate = new Date(user.lastLoginDate.toString()).getMinutes();

      const isPastOneMinute = new Date().getMinutes() - lastLoginDate < 1 ? false : true;

      if (isPastOneMinute) {
        await this.userRepository.updateById(user?._id, {
          loginAttemps: 0,
          lastLoginDate: new Date().toISOString()
        });
      }
    }
  }

  /**
   * Increase loggintAttemps counter in DB
   * for every time the user use an invalid password
   * @param email
   */
  async increaseFailureCounter(email: string): Promise<void> {
    const user = await this.userRepository.findOne({
      where: {email: email}
    });

    if (user) {
      const numberOfAttempts = !user.loginAttemps ? 0 : user.loginAttemps;

      await this.userRepository.updateById(user?._id, {
        loginAttemps: numberOfAttempts + 1,
        updatedOn: new Date()
      });
    }
  }

  /**
   * Convert data to user profile format
   * @param user
   * @returns
   */
  async convertToUserProfile(user: User): Promise<CustomProfile> {
    const response = new CustomProfile({
      _id: user._id
    });

    return response;
  }
}
