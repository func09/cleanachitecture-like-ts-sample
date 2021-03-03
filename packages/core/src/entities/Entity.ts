export type Entity = {
  id: string;
};

export type RequestParamsFromEntity<
  TEntity extends Entity,
  TReuired extends keyof TEntity,
  TOptional extends keyof TEntity
> = Readonly<
  Partial<Pick<TEntity, TOptional>> & Required<Pick<TEntity, TReuired>>
>;
