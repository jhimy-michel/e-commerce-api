import {inject} from '@loopback/core';
import {SecurityBindings} from '@loopback/security';
import {DefaultCrudRepository, Entity, juggler} from '@loopback/repository';

import {CustomProfile} from '../../models/auth/user-profile.model';
import {HttpErrors} from '@loopback/rest';

/**
 * A base class for repositories providing a way to ensure
 * the userId and organizationId is used in DB queries
 */
export class SecureRepositoryBase<T extends Entity, ID, Relations extends object = {}> extends DefaultCrudRepository<
  T,
  ID,
  Relations
> {
  constructor(
    entityClass: typeof Entity & {
      prototype: T;
    },
    dataSource: juggler.DataSource
  ) {
    super(entityClass, dataSource);
  }

  // injecting the current user as a property
  // See: https://www.youtube.com/watch?v=s2yDaKiNYCg&feature=emb_title
  @inject(SecurityBindings.USER) currentUser: CustomProfile;

  /**
   * Fetch the current user ID or throw an exception
   */
  protected getUserId(): string {
    const userId = this.currentUser._id;

    return userId;
  }

  /**
   * Validates if the parameter received
   * is null or undefined
   * @param userField
   */
  private validateUserField(userField: string | undefined): void {
    if (!userField) {
      // this should never happen, but let's be sure.
      throw new HttpErrors[403]();
    }
  }
}
