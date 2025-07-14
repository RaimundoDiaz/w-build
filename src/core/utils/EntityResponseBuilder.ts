import { BaseEntity } from "@/core/entities/common/BaseEntity";

type EntityMeta = {
  _data: Record<string, unknown>;
};

export abstract class EntityResponseBuilder {
  /**
   * Required to read the protected `_data` property from the entity so it can be returned as a JSON
   * object entirely later in the API response. Since `NextResponse` builds the JSON, we don't build
   * the JSON string here, but return the object for it.
   */
  public static extractData(entity: BaseEntity): Record<string, unknown> {
    const { _data } = entity as unknown as EntityMeta;

    return _data;
  }
}
