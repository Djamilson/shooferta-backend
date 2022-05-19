
/**
 * Client
**/

import * as runtime from './runtime/index';
declare const prisma: unique symbol
export type PrismaPromise<A> = Promise<A> & {[prisma]: true}
type UnwrapPromise<P extends any> = P extends Promise<infer R> ? R : P
type UnwrapTuple<Tuple extends readonly unknown[]> = {
  [K in keyof Tuple]: K extends `${number}` ? Tuple[K] extends PrismaPromise<infer X> ? X : UnwrapPromise<Tuple[K]> : UnwrapPromise<Tuple[K]>
};


/**
 * Model PageAccessCounter
 * 
 */
export type PageAccessCounter = {
  id: string
  metadata: Prisma.JsonValue
  created_at: Date
  updated_at: Date
}

/**
 * Model ForgottenCart
 * 
 */
export type ForgottenCart = {
  id: string
  created_at: Date
  updated_at: Date
  user_id: string
  product_id: string
  amount: number
}


/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more PageAccessCounters
 * const pageAccessCounters = await prisma.pageAccessCounter.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  T extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof T ? T['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<T['log']> : never : never,
  GlobalReject = 'rejectOnNotFound' extends keyof T
    ? T['rejectOnNotFound']
    : false
      > {
      /**
       * @private
       */
      private fetcher;
      /**
       * @private
       */
      private readonly dmmf;
      /**
       * @private
       */
      private connectionPromise?;
      /**
       * @private
       */
      private disconnectionPromise?;
      /**
       * @private
       */
      private readonly engineConfig;
      /**
       * @private
       */
      private readonly measurePerformance;

    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more PageAccessCounters
   * const pageAccessCounters = await prisma.pageAccessCounter.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<T, Prisma.PrismaClientOptions>);
  $on<V extends (U | 'beforeExit')>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : V extends 'beforeExit' ? () => Promise<void> : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): Promise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): Promise<void>;

  /**
   * Add a middleware
   */
  $use(cb: Prisma.Middleware): void

/**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends PrismaPromise<any>[]>(arg: [...P]): Promise<UnwrapTuple<P>>;


  /**
   * Executes a raw MongoDB command and returns the result of it.
   * @example
   * ```
   * const user = await prisma.$runCommandRaw({
   *   aggregate: 'User',
   *   pipeline: [{ $match: { name: 'Bob' } }, { $project: { email: true, _id: false } }],
   *   explain: false,
   * })
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $runCommandRaw(command: Prisma.InputJsonObject): PrismaPromise<Prisma.JsonObject>;

      /**
   * `prisma.pageAccessCounter`: Exposes CRUD operations for the **PageAccessCounter** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PageAccessCounters
    * const pageAccessCounters = await prisma.pageAccessCounter.findMany()
    * ```
    */
  get pageAccessCounter(): Prisma.PageAccessCounterDelegate<GlobalReject>;

  /**
   * `prisma.forgottenCart`: Exposes CRUD operations for the **ForgottenCart** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ForgottenCarts
    * const forgottenCarts = await prisma.forgottenCart.findMany()
    * ```
    */
  get forgottenCart(): Prisma.ForgottenCartDelegate<GlobalReject>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql

  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  /**
   * Prisma Client JS version: 3.14.0
   * Query Engine version: 2b0c12756921c891fec4f68d9444e18c7d5d4a6a
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches a JSON object.
   * This type can be useful to enforce some input to be JSON-compatible or as a super-type to be extended from. 
   */
  export type JsonObject = {[Key in string]?: JsonValue}

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches a JSON array.
   */
  export interface JsonArray extends Array<JsonValue> {}

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches any valid JSON value.
   */
  export type JsonValue = string | number | boolean | JsonObject | JsonArray | null

  /**
   * Matches a JSON object.
   * Unlike `JsonObject`, this type allows undefined and read-only properties.
   */
  export type InputJsonObject = {readonly [Key in string]?: InputJsonValue | null}

  /**
   * Matches a JSON array.
   * Unlike `JsonArray`, readonly arrays are assignable to this type.
   */
  export interface InputJsonArray extends ReadonlyArray<InputJsonValue | null> {}

  /**
   * Matches any valid value that can be used as an input for operations like
   * create and update as the value of a JSON field. Unlike `JsonValue`, this
   * type allows read-only arrays and read-only object properties and disallows
   * `null` at the top level.
   *
   * `null` cannot be used as the value of a JSON field because its meaning
   * would be ambiguous. Use `Prisma.JsonNull` to store the JSON null value or
   * `Prisma.DbNull` to clear the JSON value and set the field to the database
   * NULL value instead.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-by-null-values
   */
  export type InputJsonValue = string | number | boolean | InputJsonObject | InputJsonArray

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: 'DbNull'

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: 'JsonNull'

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: 'AnyNull'

  type SelectAndInclude = {
    select: any
    include: any
  }
  type HasSelect = {
    select: any
  }
  type HasInclude = {
    include: any
  }
  type CheckSelect<T, S, U> = T extends SelectAndInclude
    ? 'Please either choose `select` or `include`'
    : T extends HasSelect
    ? U
    : T extends HasInclude
    ? U
    : S

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => Promise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = {
    [key in keyof T]: T[key] extends false | undefined | null ? never : key
  }[keyof T]

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Buffer
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Exact<A, W = unknown> = 
  W extends unknown ? A extends Narrowable ? Cast<A, W> : Cast<
  {[K in keyof A]: K extends keyof W ? Exact<A[K], W[K]> : never},
  {[K in keyof W]: K extends keyof A ? Exact<A[K], W[K]> : W[K]}>
  : never;

  type Narrowable = string | number | boolean | bigint;

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;

  export function validator<V>(): <S>(select: Exact<S, V>) => S;

  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but with an array
   */
  type PickArray<T, K extends Array<keyof T>> = Prisma__Pick<T, TupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T

  class PrismaClientFetcher {
    private readonly prisma;
    private readonly debug;
    private readonly hooks?;
    constructor(prisma: PrismaClient<any, any>, debug?: boolean, hooks?: Hooks | undefined);
    request<T>(document: any, dataPath?: string[], rootField?: string, typeName?: string, isList?: boolean, callsite?: string): Promise<T>;
    sanitizeMessage(message: string): string;
    protected unpack(document: any, data: any, path: string[], rootField?: string, isList?: boolean): any;
  }

  export const ModelName: {
    PageAccessCounter: 'PageAccessCounter',
    ForgottenCart: 'ForgottenCart'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  export type RejectOnNotFound = boolean | ((error: Error) => Error)
  export type RejectPerModel = { [P in ModelName]?: RejectOnNotFound }
  export type RejectPerOperation =  { [P in "findUnique" | "findFirst"]?: RejectPerModel | RejectOnNotFound } 
  type IsReject<T> = T extends true ? True : T extends (err: Error) => Error ? True : False
  export type HasReject<
    GlobalRejectSettings extends Prisma.PrismaClientOptions['rejectOnNotFound'],
    LocalRejectSettings,
    Action extends PrismaAction,
    Model extends ModelName
  > = LocalRejectSettings extends RejectOnNotFound
    ? IsReject<LocalRejectSettings>
    : GlobalRejectSettings extends RejectPerOperation
    ? Action extends keyof GlobalRejectSettings
      ? GlobalRejectSettings[Action] extends RejectOnNotFound
        ? IsReject<GlobalRejectSettings[Action]>
        : GlobalRejectSettings[Action] extends RejectPerModel
        ? Model extends keyof GlobalRejectSettings[Action]
          ? IsReject<GlobalRejectSettings[Action][Model]>
          : False
        : False
      : False
    : IsReject<GlobalRejectSettings>
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'

  export interface PrismaClientOptions {
    /**
     * Configure findUnique/findFirst to throw an error if the query returns null. 
     *  * @example
     * ```
     * // Reject on both findUnique/findFirst
     * rejectOnNotFound: true
     * // Reject only on findFirst with a custom error
     * rejectOnNotFound: { findFirst: (err) => new Error("Custom Error")}
     * // Reject on user.findUnique with a custom error
     * rejectOnNotFound: { findUnique: {User: (err) => new Error("User not found")}}
     * ```
     */
    rejectOnNotFound?: RejectOnNotFound | RejectPerOperation
    /**
     * Overwrites the datasource url from your prisma.schema file
     */
    datasources?: Datasources

    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat

    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: Array<LogLevel | LogDefinition>
  }

  export type Hooks = {
    beforeRequest?: (options: { query: string, path: string[], rootField?: string, typeName?: string, document: any }) => any
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findMany'
    | 'findFirst'
    | 'create'
    | 'createMany'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'

  /**
   * These options are being passed in to the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => Promise<T>,
  ) => Promise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */



  /**
   * Models
   */

  /**
   * Model PageAccessCounter
   */


  export type AggregatePageAccessCounter = {
    _count: PageAccessCounterCountAggregateOutputType | null
    _min: PageAccessCounterMinAggregateOutputType | null
    _max: PageAccessCounterMaxAggregateOutputType | null
  }

  export type PageAccessCounterMinAggregateOutputType = {
    id: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type PageAccessCounterMaxAggregateOutputType = {
    id: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type PageAccessCounterCountAggregateOutputType = {
    id: number
    metadata: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type PageAccessCounterMinAggregateInputType = {
    id?: true
    created_at?: true
    updated_at?: true
  }

  export type PageAccessCounterMaxAggregateInputType = {
    id?: true
    created_at?: true
    updated_at?: true
  }

  export type PageAccessCounterCountAggregateInputType = {
    id?: true
    metadata?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type PageAccessCounterAggregateArgs = {
    /**
     * Filter which PageAccessCounter to aggregate.
     * 
    **/
    where?: PageAccessCounterWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PageAccessCounters to fetch.
     * 
    **/
    orderBy?: Enumerable<PageAccessCounterOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: PageAccessCounterWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PageAccessCounters from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PageAccessCounters.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PageAccessCounters
    **/
    _count?: true | PageAccessCounterCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PageAccessCounterMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PageAccessCounterMaxAggregateInputType
  }

  export type GetPageAccessCounterAggregateType<T extends PageAccessCounterAggregateArgs> = {
        [P in keyof T & keyof AggregatePageAccessCounter]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePageAccessCounter[P]>
      : GetScalarType<T[P], AggregatePageAccessCounter[P]>
  }




  export type PageAccessCounterGroupByArgs = {
    where?: PageAccessCounterWhereInput
    orderBy?: Enumerable<PageAccessCounterOrderByWithAggregationInput>
    by: Array<PageAccessCounterScalarFieldEnum>
    having?: PageAccessCounterScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PageAccessCounterCountAggregateInputType | true
    _min?: PageAccessCounterMinAggregateInputType
    _max?: PageAccessCounterMaxAggregateInputType
  }


  export type PageAccessCounterGroupByOutputType = {
    id: string
    metadata: JsonValue
    created_at: Date
    updated_at: Date
    _count: PageAccessCounterCountAggregateOutputType | null
    _min: PageAccessCounterMinAggregateOutputType | null
    _max: PageAccessCounterMaxAggregateOutputType | null
  }

  type GetPageAccessCounterGroupByPayload<T extends PageAccessCounterGroupByArgs> = PrismaPromise<
    Array<
      PickArray<PageAccessCounterGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PageAccessCounterGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PageAccessCounterGroupByOutputType[P]>
            : GetScalarType<T[P], PageAccessCounterGroupByOutputType[P]>
        }
      >
    >


  export type PageAccessCounterSelect = {
    id?: boolean
    metadata?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type PageAccessCounterGetPayload<
    S extends boolean | null | undefined | PageAccessCounterArgs,
    U = keyof S
      > = S extends true
        ? PageAccessCounter
    : S extends undefined
    ? never
    : S extends PageAccessCounterArgs | PageAccessCounterFindManyArgs
    ?'include' extends U
    ? PageAccessCounter 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
    P extends keyof PageAccessCounter ? PageAccessCounter[P] : never
  } 
    : PageAccessCounter
  : PageAccessCounter


  type PageAccessCounterCountArgs = Merge<
    Omit<PageAccessCounterFindManyArgs, 'select' | 'include'> & {
      select?: PageAccessCounterCountAggregateInputType | true
    }
  >

  export interface PageAccessCounterDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one PageAccessCounter that matches the filter.
     * @param {PageAccessCounterFindUniqueArgs} args - Arguments to find a PageAccessCounter
     * @example
     * // Get one PageAccessCounter
     * const pageAccessCounter = await prisma.pageAccessCounter.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends PageAccessCounterFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, PageAccessCounterFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'PageAccessCounter'> extends True ? CheckSelect<T, Prisma__PageAccessCounterClient<PageAccessCounter>, Prisma__PageAccessCounterClient<PageAccessCounterGetPayload<T>>> : CheckSelect<T, Prisma__PageAccessCounterClient<PageAccessCounter | null >, Prisma__PageAccessCounterClient<PageAccessCounterGetPayload<T> | null >>

    /**
     * Find the first PageAccessCounter that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PageAccessCounterFindFirstArgs} args - Arguments to find a PageAccessCounter
     * @example
     * // Get one PageAccessCounter
     * const pageAccessCounter = await prisma.pageAccessCounter.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends PageAccessCounterFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, PageAccessCounterFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'PageAccessCounter'> extends True ? CheckSelect<T, Prisma__PageAccessCounterClient<PageAccessCounter>, Prisma__PageAccessCounterClient<PageAccessCounterGetPayload<T>>> : CheckSelect<T, Prisma__PageAccessCounterClient<PageAccessCounter | null >, Prisma__PageAccessCounterClient<PageAccessCounterGetPayload<T> | null >>

    /**
     * Find zero or more PageAccessCounters that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PageAccessCounterFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PageAccessCounters
     * const pageAccessCounters = await prisma.pageAccessCounter.findMany()
     * 
     * // Get first 10 PageAccessCounters
     * const pageAccessCounters = await prisma.pageAccessCounter.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const pageAccessCounterWithIdOnly = await prisma.pageAccessCounter.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends PageAccessCounterFindManyArgs>(
      args?: SelectSubset<T, PageAccessCounterFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<PageAccessCounter>>, PrismaPromise<Array<PageAccessCounterGetPayload<T>>>>

    /**
     * Create a PageAccessCounter.
     * @param {PageAccessCounterCreateArgs} args - Arguments to create a PageAccessCounter.
     * @example
     * // Create one PageAccessCounter
     * const PageAccessCounter = await prisma.pageAccessCounter.create({
     *   data: {
     *     // ... data to create a PageAccessCounter
     *   }
     * })
     * 
    **/
    create<T extends PageAccessCounterCreateArgs>(
      args: SelectSubset<T, PageAccessCounterCreateArgs>
    ): CheckSelect<T, Prisma__PageAccessCounterClient<PageAccessCounter>, Prisma__PageAccessCounterClient<PageAccessCounterGetPayload<T>>>

    /**
     * Create many PageAccessCounters.
     *     @param {PageAccessCounterCreateManyArgs} args - Arguments to create many PageAccessCounters.
     *     @example
     *     // Create many PageAccessCounters
     *     const pageAccessCounter = await prisma.pageAccessCounter.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends PageAccessCounterCreateManyArgs>(
      args?: SelectSubset<T, PageAccessCounterCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a PageAccessCounter.
     * @param {PageAccessCounterDeleteArgs} args - Arguments to delete one PageAccessCounter.
     * @example
     * // Delete one PageAccessCounter
     * const PageAccessCounter = await prisma.pageAccessCounter.delete({
     *   where: {
     *     // ... filter to delete one PageAccessCounter
     *   }
     * })
     * 
    **/
    delete<T extends PageAccessCounterDeleteArgs>(
      args: SelectSubset<T, PageAccessCounterDeleteArgs>
    ): CheckSelect<T, Prisma__PageAccessCounterClient<PageAccessCounter>, Prisma__PageAccessCounterClient<PageAccessCounterGetPayload<T>>>

    /**
     * Update one PageAccessCounter.
     * @param {PageAccessCounterUpdateArgs} args - Arguments to update one PageAccessCounter.
     * @example
     * // Update one PageAccessCounter
     * const pageAccessCounter = await prisma.pageAccessCounter.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends PageAccessCounterUpdateArgs>(
      args: SelectSubset<T, PageAccessCounterUpdateArgs>
    ): CheckSelect<T, Prisma__PageAccessCounterClient<PageAccessCounter>, Prisma__PageAccessCounterClient<PageAccessCounterGetPayload<T>>>

    /**
     * Delete zero or more PageAccessCounters.
     * @param {PageAccessCounterDeleteManyArgs} args - Arguments to filter PageAccessCounters to delete.
     * @example
     * // Delete a few PageAccessCounters
     * const { count } = await prisma.pageAccessCounter.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends PageAccessCounterDeleteManyArgs>(
      args?: SelectSubset<T, PageAccessCounterDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more PageAccessCounters.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PageAccessCounterUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PageAccessCounters
     * const pageAccessCounter = await prisma.pageAccessCounter.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends PageAccessCounterUpdateManyArgs>(
      args: SelectSubset<T, PageAccessCounterUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one PageAccessCounter.
     * @param {PageAccessCounterUpsertArgs} args - Arguments to update or create a PageAccessCounter.
     * @example
     * // Update or create a PageAccessCounter
     * const pageAccessCounter = await prisma.pageAccessCounter.upsert({
     *   create: {
     *     // ... data to create a PageAccessCounter
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PageAccessCounter we want to update
     *   }
     * })
    **/
    upsert<T extends PageAccessCounterUpsertArgs>(
      args: SelectSubset<T, PageAccessCounterUpsertArgs>
    ): CheckSelect<T, Prisma__PageAccessCounterClient<PageAccessCounter>, Prisma__PageAccessCounterClient<PageAccessCounterGetPayload<T>>>

    /**
     * Find zero or more PageAccessCounters that matches the filter.
     * @param {PageAccessCounterFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const pageAccessCounter = await prisma.pageAccessCounter.findRaw({
     *   filter: { age: { $gt: 25 } } 
     * })
    **/
    findRaw(
      args?: PageAccessCounterFindRawArgs
    ): PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a PageAccessCounter.
     * @param {PageAccessCounterAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const pageAccessCounter = await prisma.pageAccessCounter.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
    **/
    aggregateRaw(
      args?: PageAccessCounterAggregateRawArgs
    ): PrismaPromise<JsonObject>

    /**
     * Count the number of PageAccessCounters.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PageAccessCounterCountArgs} args - Arguments to filter PageAccessCounters to count.
     * @example
     * // Count the number of PageAccessCounters
     * const count = await prisma.pageAccessCounter.count({
     *   where: {
     *     // ... the filter for the PageAccessCounters we want to count
     *   }
     * })
    **/
    count<T extends PageAccessCounterCountArgs>(
      args?: Subset<T, PageAccessCounterCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PageAccessCounterCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PageAccessCounter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PageAccessCounterAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PageAccessCounterAggregateArgs>(args: Subset<T, PageAccessCounterAggregateArgs>): PrismaPromise<GetPageAccessCounterAggregateType<T>>

    /**
     * Group by PageAccessCounter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PageAccessCounterGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PageAccessCounterGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PageAccessCounterGroupByArgs['orderBy'] }
        : { orderBy?: PageAccessCounterGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PageAccessCounterGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPageAccessCounterGroupByPayload<T> : PrismaPromise<InputErrors>
  }

  /**
   * The delegate class that acts as a "Promise-like" for PageAccessCounter.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__PageAccessCounterClient<T> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';


    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }

  // Custom InputTypes

  /**
   * PageAccessCounter findUnique
   */
  export type PageAccessCounterFindUniqueArgs = {
    /**
     * Select specific fields to fetch from the PageAccessCounter
     * 
    **/
    select?: PageAccessCounterSelect | null
    /**
     * Throw an Error if a PageAccessCounter can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which PageAccessCounter to fetch.
     * 
    **/
    where: PageAccessCounterWhereUniqueInput
  }


  /**
   * PageAccessCounter findFirst
   */
  export type PageAccessCounterFindFirstArgs = {
    /**
     * Select specific fields to fetch from the PageAccessCounter
     * 
    **/
    select?: PageAccessCounterSelect | null
    /**
     * Throw an Error if a PageAccessCounter can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which PageAccessCounter to fetch.
     * 
    **/
    where?: PageAccessCounterWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PageAccessCounters to fetch.
     * 
    **/
    orderBy?: Enumerable<PageAccessCounterOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PageAccessCounters.
     * 
    **/
    cursor?: PageAccessCounterWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PageAccessCounters from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PageAccessCounters.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PageAccessCounters.
     * 
    **/
    distinct?: Enumerable<PageAccessCounterScalarFieldEnum>
  }


  /**
   * PageAccessCounter findMany
   */
  export type PageAccessCounterFindManyArgs = {
    /**
     * Select specific fields to fetch from the PageAccessCounter
     * 
    **/
    select?: PageAccessCounterSelect | null
    /**
     * Filter, which PageAccessCounters to fetch.
     * 
    **/
    where?: PageAccessCounterWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PageAccessCounters to fetch.
     * 
    **/
    orderBy?: Enumerable<PageAccessCounterOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PageAccessCounters.
     * 
    **/
    cursor?: PageAccessCounterWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PageAccessCounters from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PageAccessCounters.
     * 
    **/
    skip?: number
    distinct?: Enumerable<PageAccessCounterScalarFieldEnum>
  }


  /**
   * PageAccessCounter create
   */
  export type PageAccessCounterCreateArgs = {
    /**
     * Select specific fields to fetch from the PageAccessCounter
     * 
    **/
    select?: PageAccessCounterSelect | null
    /**
     * The data needed to create a PageAccessCounter.
     * 
    **/
    data: XOR<PageAccessCounterCreateInput, PageAccessCounterUncheckedCreateInput>
  }


  /**
   * PageAccessCounter createMany
   */
  export type PageAccessCounterCreateManyArgs = {
    /**
     * The data used to create many PageAccessCounters.
     * 
    **/
    data: Enumerable<PageAccessCounterCreateManyInput>
  }


  /**
   * PageAccessCounter update
   */
  export type PageAccessCounterUpdateArgs = {
    /**
     * Select specific fields to fetch from the PageAccessCounter
     * 
    **/
    select?: PageAccessCounterSelect | null
    /**
     * The data needed to update a PageAccessCounter.
     * 
    **/
    data: XOR<PageAccessCounterUpdateInput, PageAccessCounterUncheckedUpdateInput>
    /**
     * Choose, which PageAccessCounter to update.
     * 
    **/
    where: PageAccessCounterWhereUniqueInput
  }


  /**
   * PageAccessCounter updateMany
   */
  export type PageAccessCounterUpdateManyArgs = {
    /**
     * The data used to update PageAccessCounters.
     * 
    **/
    data: XOR<PageAccessCounterUpdateManyMutationInput, PageAccessCounterUncheckedUpdateManyInput>
    /**
     * Filter which PageAccessCounters to update
     * 
    **/
    where?: PageAccessCounterWhereInput
  }


  /**
   * PageAccessCounter upsert
   */
  export type PageAccessCounterUpsertArgs = {
    /**
     * Select specific fields to fetch from the PageAccessCounter
     * 
    **/
    select?: PageAccessCounterSelect | null
    /**
     * The filter to search for the PageAccessCounter to update in case it exists.
     * 
    **/
    where: PageAccessCounterWhereUniqueInput
    /**
     * In case the PageAccessCounter found by the `where` argument doesn't exist, create a new PageAccessCounter with this data.
     * 
    **/
    create: XOR<PageAccessCounterCreateInput, PageAccessCounterUncheckedCreateInput>
    /**
     * In case the PageAccessCounter was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<PageAccessCounterUpdateInput, PageAccessCounterUncheckedUpdateInput>
  }


  /**
   * PageAccessCounter delete
   */
  export type PageAccessCounterDeleteArgs = {
    /**
     * Select specific fields to fetch from the PageAccessCounter
     * 
    **/
    select?: PageAccessCounterSelect | null
    /**
     * Filter which PageAccessCounter to delete.
     * 
    **/
    where: PageAccessCounterWhereUniqueInput
  }


  /**
   * PageAccessCounter deleteMany
   */
  export type PageAccessCounterDeleteManyArgs = {
    /**
     * Filter which PageAccessCounters to delete
     * 
    **/
    where?: PageAccessCounterWhereInput
  }


  /**
   * PageAccessCounter findRaw
   */
  export type PageAccessCounterFindRawArgs = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     * 
    **/
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     * 
    **/
    options?: InputJsonValue
  }


  /**
   * PageAccessCounter aggregateRaw
   */
  export type PageAccessCounterAggregateRawArgs = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     * 
    **/
    pipeline?: Array<InputJsonValue>
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     * 
    **/
    options?: InputJsonValue
  }


  /**
   * PageAccessCounter without action
   */
  export type PageAccessCounterArgs = {
    /**
     * Select specific fields to fetch from the PageAccessCounter
     * 
    **/
    select?: PageAccessCounterSelect | null
  }



  /**
   * Model ForgottenCart
   */


  export type AggregateForgottenCart = {
    _count: ForgottenCartCountAggregateOutputType | null
    _avg: ForgottenCartAvgAggregateOutputType | null
    _sum: ForgottenCartSumAggregateOutputType | null
    _min: ForgottenCartMinAggregateOutputType | null
    _max: ForgottenCartMaxAggregateOutputType | null
  }

  export type ForgottenCartAvgAggregateOutputType = {
    amount: number | null
  }

  export type ForgottenCartSumAggregateOutputType = {
    amount: number | null
  }

  export type ForgottenCartMinAggregateOutputType = {
    id: string | null
    created_at: Date | null
    updated_at: Date | null
    user_id: string | null
    product_id: string | null
    amount: number | null
  }

  export type ForgottenCartMaxAggregateOutputType = {
    id: string | null
    created_at: Date | null
    updated_at: Date | null
    user_id: string | null
    product_id: string | null
    amount: number | null
  }

  export type ForgottenCartCountAggregateOutputType = {
    id: number
    created_at: number
    updated_at: number
    user_id: number
    product_id: number
    amount: number
    _all: number
  }


  export type ForgottenCartAvgAggregateInputType = {
    amount?: true
  }

  export type ForgottenCartSumAggregateInputType = {
    amount?: true
  }

  export type ForgottenCartMinAggregateInputType = {
    id?: true
    created_at?: true
    updated_at?: true
    user_id?: true
    product_id?: true
    amount?: true
  }

  export type ForgottenCartMaxAggregateInputType = {
    id?: true
    created_at?: true
    updated_at?: true
    user_id?: true
    product_id?: true
    amount?: true
  }

  export type ForgottenCartCountAggregateInputType = {
    id?: true
    created_at?: true
    updated_at?: true
    user_id?: true
    product_id?: true
    amount?: true
    _all?: true
  }

  export type ForgottenCartAggregateArgs = {
    /**
     * Filter which ForgottenCart to aggregate.
     * 
    **/
    where?: ForgottenCartWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ForgottenCarts to fetch.
     * 
    **/
    orderBy?: Enumerable<ForgottenCartOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: ForgottenCartWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ForgottenCarts from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ForgottenCarts.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ForgottenCarts
    **/
    _count?: true | ForgottenCartCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ForgottenCartAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ForgottenCartSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ForgottenCartMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ForgottenCartMaxAggregateInputType
  }

  export type GetForgottenCartAggregateType<T extends ForgottenCartAggregateArgs> = {
        [P in keyof T & keyof AggregateForgottenCart]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateForgottenCart[P]>
      : GetScalarType<T[P], AggregateForgottenCart[P]>
  }




  export type ForgottenCartGroupByArgs = {
    where?: ForgottenCartWhereInput
    orderBy?: Enumerable<ForgottenCartOrderByWithAggregationInput>
    by: Array<ForgottenCartScalarFieldEnum>
    having?: ForgottenCartScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ForgottenCartCountAggregateInputType | true
    _avg?: ForgottenCartAvgAggregateInputType
    _sum?: ForgottenCartSumAggregateInputType
    _min?: ForgottenCartMinAggregateInputType
    _max?: ForgottenCartMaxAggregateInputType
  }


  export type ForgottenCartGroupByOutputType = {
    id: string
    created_at: Date
    updated_at: Date
    user_id: string
    product_id: string
    amount: number
    _count: ForgottenCartCountAggregateOutputType | null
    _avg: ForgottenCartAvgAggregateOutputType | null
    _sum: ForgottenCartSumAggregateOutputType | null
    _min: ForgottenCartMinAggregateOutputType | null
    _max: ForgottenCartMaxAggregateOutputType | null
  }

  type GetForgottenCartGroupByPayload<T extends ForgottenCartGroupByArgs> = PrismaPromise<
    Array<
      PickArray<ForgottenCartGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ForgottenCartGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ForgottenCartGroupByOutputType[P]>
            : GetScalarType<T[P], ForgottenCartGroupByOutputType[P]>
        }
      >
    >


  export type ForgottenCartSelect = {
    id?: boolean
    created_at?: boolean
    updated_at?: boolean
    user_id?: boolean
    product_id?: boolean
    amount?: boolean
  }

  export type ForgottenCartGetPayload<
    S extends boolean | null | undefined | ForgottenCartArgs,
    U = keyof S
      > = S extends true
        ? ForgottenCart
    : S extends undefined
    ? never
    : S extends ForgottenCartArgs | ForgottenCartFindManyArgs
    ?'include' extends U
    ? ForgottenCart 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
    P extends keyof ForgottenCart ? ForgottenCart[P] : never
  } 
    : ForgottenCart
  : ForgottenCart


  type ForgottenCartCountArgs = Merge<
    Omit<ForgottenCartFindManyArgs, 'select' | 'include'> & {
      select?: ForgottenCartCountAggregateInputType | true
    }
  >

  export interface ForgottenCartDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one ForgottenCart that matches the filter.
     * @param {ForgottenCartFindUniqueArgs} args - Arguments to find a ForgottenCart
     * @example
     * // Get one ForgottenCart
     * const forgottenCart = await prisma.forgottenCart.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends ForgottenCartFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, ForgottenCartFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'ForgottenCart'> extends True ? CheckSelect<T, Prisma__ForgottenCartClient<ForgottenCart>, Prisma__ForgottenCartClient<ForgottenCartGetPayload<T>>> : CheckSelect<T, Prisma__ForgottenCartClient<ForgottenCart | null >, Prisma__ForgottenCartClient<ForgottenCartGetPayload<T> | null >>

    /**
     * Find the first ForgottenCart that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ForgottenCartFindFirstArgs} args - Arguments to find a ForgottenCart
     * @example
     * // Get one ForgottenCart
     * const forgottenCart = await prisma.forgottenCart.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends ForgottenCartFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, ForgottenCartFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'ForgottenCart'> extends True ? CheckSelect<T, Prisma__ForgottenCartClient<ForgottenCart>, Prisma__ForgottenCartClient<ForgottenCartGetPayload<T>>> : CheckSelect<T, Prisma__ForgottenCartClient<ForgottenCart | null >, Prisma__ForgottenCartClient<ForgottenCartGetPayload<T> | null >>

    /**
     * Find zero or more ForgottenCarts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ForgottenCartFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ForgottenCarts
     * const forgottenCarts = await prisma.forgottenCart.findMany()
     * 
     * // Get first 10 ForgottenCarts
     * const forgottenCarts = await prisma.forgottenCart.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const forgottenCartWithIdOnly = await prisma.forgottenCart.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends ForgottenCartFindManyArgs>(
      args?: SelectSubset<T, ForgottenCartFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<ForgottenCart>>, PrismaPromise<Array<ForgottenCartGetPayload<T>>>>

    /**
     * Create a ForgottenCart.
     * @param {ForgottenCartCreateArgs} args - Arguments to create a ForgottenCart.
     * @example
     * // Create one ForgottenCart
     * const ForgottenCart = await prisma.forgottenCart.create({
     *   data: {
     *     // ... data to create a ForgottenCart
     *   }
     * })
     * 
    **/
    create<T extends ForgottenCartCreateArgs>(
      args: SelectSubset<T, ForgottenCartCreateArgs>
    ): CheckSelect<T, Prisma__ForgottenCartClient<ForgottenCart>, Prisma__ForgottenCartClient<ForgottenCartGetPayload<T>>>

    /**
     * Create many ForgottenCarts.
     *     @param {ForgottenCartCreateManyArgs} args - Arguments to create many ForgottenCarts.
     *     @example
     *     // Create many ForgottenCarts
     *     const forgottenCart = await prisma.forgottenCart.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends ForgottenCartCreateManyArgs>(
      args?: SelectSubset<T, ForgottenCartCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a ForgottenCart.
     * @param {ForgottenCartDeleteArgs} args - Arguments to delete one ForgottenCart.
     * @example
     * // Delete one ForgottenCart
     * const ForgottenCart = await prisma.forgottenCart.delete({
     *   where: {
     *     // ... filter to delete one ForgottenCart
     *   }
     * })
     * 
    **/
    delete<T extends ForgottenCartDeleteArgs>(
      args: SelectSubset<T, ForgottenCartDeleteArgs>
    ): CheckSelect<T, Prisma__ForgottenCartClient<ForgottenCart>, Prisma__ForgottenCartClient<ForgottenCartGetPayload<T>>>

    /**
     * Update one ForgottenCart.
     * @param {ForgottenCartUpdateArgs} args - Arguments to update one ForgottenCart.
     * @example
     * // Update one ForgottenCart
     * const forgottenCart = await prisma.forgottenCart.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends ForgottenCartUpdateArgs>(
      args: SelectSubset<T, ForgottenCartUpdateArgs>
    ): CheckSelect<T, Prisma__ForgottenCartClient<ForgottenCart>, Prisma__ForgottenCartClient<ForgottenCartGetPayload<T>>>

    /**
     * Delete zero or more ForgottenCarts.
     * @param {ForgottenCartDeleteManyArgs} args - Arguments to filter ForgottenCarts to delete.
     * @example
     * // Delete a few ForgottenCarts
     * const { count } = await prisma.forgottenCart.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends ForgottenCartDeleteManyArgs>(
      args?: SelectSubset<T, ForgottenCartDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more ForgottenCarts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ForgottenCartUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ForgottenCarts
     * const forgottenCart = await prisma.forgottenCart.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends ForgottenCartUpdateManyArgs>(
      args: SelectSubset<T, ForgottenCartUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one ForgottenCart.
     * @param {ForgottenCartUpsertArgs} args - Arguments to update or create a ForgottenCart.
     * @example
     * // Update or create a ForgottenCart
     * const forgottenCart = await prisma.forgottenCart.upsert({
     *   create: {
     *     // ... data to create a ForgottenCart
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ForgottenCart we want to update
     *   }
     * })
    **/
    upsert<T extends ForgottenCartUpsertArgs>(
      args: SelectSubset<T, ForgottenCartUpsertArgs>
    ): CheckSelect<T, Prisma__ForgottenCartClient<ForgottenCart>, Prisma__ForgottenCartClient<ForgottenCartGetPayload<T>>>

    /**
     * Find zero or more ForgottenCarts that matches the filter.
     * @param {ForgottenCartFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const forgottenCart = await prisma.forgottenCart.findRaw({
     *   filter: { age: { $gt: 25 } } 
     * })
    **/
    findRaw(
      args?: ForgottenCartFindRawArgs
    ): PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a ForgottenCart.
     * @param {ForgottenCartAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const forgottenCart = await prisma.forgottenCart.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
    **/
    aggregateRaw(
      args?: ForgottenCartAggregateRawArgs
    ): PrismaPromise<JsonObject>

    /**
     * Count the number of ForgottenCarts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ForgottenCartCountArgs} args - Arguments to filter ForgottenCarts to count.
     * @example
     * // Count the number of ForgottenCarts
     * const count = await prisma.forgottenCart.count({
     *   where: {
     *     // ... the filter for the ForgottenCarts we want to count
     *   }
     * })
    **/
    count<T extends ForgottenCartCountArgs>(
      args?: Subset<T, ForgottenCartCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ForgottenCartCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ForgottenCart.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ForgottenCartAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ForgottenCartAggregateArgs>(args: Subset<T, ForgottenCartAggregateArgs>): PrismaPromise<GetForgottenCartAggregateType<T>>

    /**
     * Group by ForgottenCart.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ForgottenCartGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ForgottenCartGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ForgottenCartGroupByArgs['orderBy'] }
        : { orderBy?: ForgottenCartGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ForgottenCartGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetForgottenCartGroupByPayload<T> : PrismaPromise<InputErrors>
  }

  /**
   * The delegate class that acts as a "Promise-like" for ForgottenCart.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__ForgottenCartClient<T> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';


    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }

  // Custom InputTypes

  /**
   * ForgottenCart findUnique
   */
  export type ForgottenCartFindUniqueArgs = {
    /**
     * Select specific fields to fetch from the ForgottenCart
     * 
    **/
    select?: ForgottenCartSelect | null
    /**
     * Throw an Error if a ForgottenCart can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which ForgottenCart to fetch.
     * 
    **/
    where: ForgottenCartWhereUniqueInput
  }


  /**
   * ForgottenCart findFirst
   */
  export type ForgottenCartFindFirstArgs = {
    /**
     * Select specific fields to fetch from the ForgottenCart
     * 
    **/
    select?: ForgottenCartSelect | null
    /**
     * Throw an Error if a ForgottenCart can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which ForgottenCart to fetch.
     * 
    **/
    where?: ForgottenCartWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ForgottenCarts to fetch.
     * 
    **/
    orderBy?: Enumerable<ForgottenCartOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ForgottenCarts.
     * 
    **/
    cursor?: ForgottenCartWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ForgottenCarts from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ForgottenCarts.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ForgottenCarts.
     * 
    **/
    distinct?: Enumerable<ForgottenCartScalarFieldEnum>
  }


  /**
   * ForgottenCart findMany
   */
  export type ForgottenCartFindManyArgs = {
    /**
     * Select specific fields to fetch from the ForgottenCart
     * 
    **/
    select?: ForgottenCartSelect | null
    /**
     * Filter, which ForgottenCarts to fetch.
     * 
    **/
    where?: ForgottenCartWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ForgottenCarts to fetch.
     * 
    **/
    orderBy?: Enumerable<ForgottenCartOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ForgottenCarts.
     * 
    **/
    cursor?: ForgottenCartWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ForgottenCarts from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ForgottenCarts.
     * 
    **/
    skip?: number
    distinct?: Enumerable<ForgottenCartScalarFieldEnum>
  }


  /**
   * ForgottenCart create
   */
  export type ForgottenCartCreateArgs = {
    /**
     * Select specific fields to fetch from the ForgottenCart
     * 
    **/
    select?: ForgottenCartSelect | null
    /**
     * The data needed to create a ForgottenCart.
     * 
    **/
    data: XOR<ForgottenCartCreateInput, ForgottenCartUncheckedCreateInput>
  }


  /**
   * ForgottenCart createMany
   */
  export type ForgottenCartCreateManyArgs = {
    /**
     * The data used to create many ForgottenCarts.
     * 
    **/
    data: Enumerable<ForgottenCartCreateManyInput>
  }


  /**
   * ForgottenCart update
   */
  export type ForgottenCartUpdateArgs = {
    /**
     * Select specific fields to fetch from the ForgottenCart
     * 
    **/
    select?: ForgottenCartSelect | null
    /**
     * The data needed to update a ForgottenCart.
     * 
    **/
    data: XOR<ForgottenCartUpdateInput, ForgottenCartUncheckedUpdateInput>
    /**
     * Choose, which ForgottenCart to update.
     * 
    **/
    where: ForgottenCartWhereUniqueInput
  }


  /**
   * ForgottenCart updateMany
   */
  export type ForgottenCartUpdateManyArgs = {
    /**
     * The data used to update ForgottenCarts.
     * 
    **/
    data: XOR<ForgottenCartUpdateManyMutationInput, ForgottenCartUncheckedUpdateManyInput>
    /**
     * Filter which ForgottenCarts to update
     * 
    **/
    where?: ForgottenCartWhereInput
  }


  /**
   * ForgottenCart upsert
   */
  export type ForgottenCartUpsertArgs = {
    /**
     * Select specific fields to fetch from the ForgottenCart
     * 
    **/
    select?: ForgottenCartSelect | null
    /**
     * The filter to search for the ForgottenCart to update in case it exists.
     * 
    **/
    where: ForgottenCartWhereUniqueInput
    /**
     * In case the ForgottenCart found by the `where` argument doesn't exist, create a new ForgottenCart with this data.
     * 
    **/
    create: XOR<ForgottenCartCreateInput, ForgottenCartUncheckedCreateInput>
    /**
     * In case the ForgottenCart was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<ForgottenCartUpdateInput, ForgottenCartUncheckedUpdateInput>
  }


  /**
   * ForgottenCart delete
   */
  export type ForgottenCartDeleteArgs = {
    /**
     * Select specific fields to fetch from the ForgottenCart
     * 
    **/
    select?: ForgottenCartSelect | null
    /**
     * Filter which ForgottenCart to delete.
     * 
    **/
    where: ForgottenCartWhereUniqueInput
  }


  /**
   * ForgottenCart deleteMany
   */
  export type ForgottenCartDeleteManyArgs = {
    /**
     * Filter which ForgottenCarts to delete
     * 
    **/
    where?: ForgottenCartWhereInput
  }


  /**
   * ForgottenCart findRaw
   */
  export type ForgottenCartFindRawArgs = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     * 
    **/
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     * 
    **/
    options?: InputJsonValue
  }


  /**
   * ForgottenCart aggregateRaw
   */
  export type ForgottenCartAggregateRawArgs = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     * 
    **/
    pipeline?: Array<InputJsonValue>
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     * 
    **/
    options?: InputJsonValue
  }


  /**
   * ForgottenCart without action
   */
  export type ForgottenCartArgs = {
    /**
     * Select specific fields to fetch from the ForgottenCart
     * 
    **/
    select?: ForgottenCartSelect | null
  }



  /**
   * Enums
   */

  // Based on
  // https://github.com/microsoft/TypeScript/issues/3192#issuecomment-261720275

  export const PageAccessCounterScalarFieldEnum: {
    id: 'id',
    metadata: 'metadata',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type PageAccessCounterScalarFieldEnum = (typeof PageAccessCounterScalarFieldEnum)[keyof typeof PageAccessCounterScalarFieldEnum]


  export const ForgottenCartScalarFieldEnum: {
    id: 'id',
    created_at: 'created_at',
    updated_at: 'updated_at',
    user_id: 'user_id',
    product_id: 'product_id',
    amount: 'amount'
  };

  export type ForgottenCartScalarFieldEnum = (typeof ForgottenCartScalarFieldEnum)[keyof typeof ForgottenCartScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  /**
   * Deep Input Types
   */


  export type PageAccessCounterWhereInput = {
    AND?: Enumerable<PageAccessCounterWhereInput>
    OR?: Enumerable<PageAccessCounterWhereInput>
    NOT?: Enumerable<PageAccessCounterWhereInput>
    id?: StringFilter | string
    metadata?: JsonFilter
    created_at?: DateTimeFilter | Date | string
    updated_at?: DateTimeFilter | Date | string
  }

  export type PageAccessCounterOrderByWithRelationInput = {
    id?: SortOrder
    metadata?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type PageAccessCounterWhereUniqueInput = {
    id?: string
  }

  export type PageAccessCounterOrderByWithAggregationInput = {
    id?: SortOrder
    metadata?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: PageAccessCounterCountOrderByAggregateInput
    _max?: PageAccessCounterMaxOrderByAggregateInput
    _min?: PageAccessCounterMinOrderByAggregateInput
  }

  export type PageAccessCounterScalarWhereWithAggregatesInput = {
    AND?: Enumerable<PageAccessCounterScalarWhereWithAggregatesInput>
    OR?: Enumerable<PageAccessCounterScalarWhereWithAggregatesInput>
    NOT?: Enumerable<PageAccessCounterScalarWhereWithAggregatesInput>
    id?: StringWithAggregatesFilter | string
    metadata?: JsonWithAggregatesFilter
    created_at?: DateTimeWithAggregatesFilter | Date | string
    updated_at?: DateTimeWithAggregatesFilter | Date | string
  }

  export type ForgottenCartWhereInput = {
    AND?: Enumerable<ForgottenCartWhereInput>
    OR?: Enumerable<ForgottenCartWhereInput>
    NOT?: Enumerable<ForgottenCartWhereInput>
    id?: StringFilter | string
    created_at?: DateTimeFilter | Date | string
    updated_at?: DateTimeFilter | Date | string
    user_id?: StringFilter | string
    product_id?: StringFilter | string
    amount?: IntFilter | number
  }

  export type ForgottenCartOrderByWithRelationInput = {
    id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    user_id?: SortOrder
    product_id?: SortOrder
    amount?: SortOrder
  }

  export type ForgottenCartWhereUniqueInput = {
    id?: string
  }

  export type ForgottenCartOrderByWithAggregationInput = {
    id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    user_id?: SortOrder
    product_id?: SortOrder
    amount?: SortOrder
    _count?: ForgottenCartCountOrderByAggregateInput
    _avg?: ForgottenCartAvgOrderByAggregateInput
    _max?: ForgottenCartMaxOrderByAggregateInput
    _min?: ForgottenCartMinOrderByAggregateInput
    _sum?: ForgottenCartSumOrderByAggregateInput
  }

  export type ForgottenCartScalarWhereWithAggregatesInput = {
    AND?: Enumerable<ForgottenCartScalarWhereWithAggregatesInput>
    OR?: Enumerable<ForgottenCartScalarWhereWithAggregatesInput>
    NOT?: Enumerable<ForgottenCartScalarWhereWithAggregatesInput>
    id?: StringWithAggregatesFilter | string
    created_at?: DateTimeWithAggregatesFilter | Date | string
    updated_at?: DateTimeWithAggregatesFilter | Date | string
    user_id?: StringWithAggregatesFilter | string
    product_id?: StringWithAggregatesFilter | string
    amount?: IntWithAggregatesFilter | number
  }

  export type PageAccessCounterCreateInput = {
    id?: string
    metadata: InputJsonValue
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type PageAccessCounterUncheckedCreateInput = {
    id?: string
    metadata: InputJsonValue
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type PageAccessCounterUpdateInput = {
    metadata?: InputJsonValue | InputJsonValue
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PageAccessCounterUncheckedUpdateInput = {
    metadata?: InputJsonValue | InputJsonValue
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PageAccessCounterCreateManyInput = {
    id?: string
    metadata: InputJsonValue
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type PageAccessCounterUpdateManyMutationInput = {
    metadata?: InputJsonValue | InputJsonValue
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PageAccessCounterUncheckedUpdateManyInput = {
    metadata?: InputJsonValue | InputJsonValue
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ForgottenCartCreateInput = {
    id?: string
    created_at?: Date | string
    updated_at?: Date | string
    user_id: string
    product_id: string
    amount: number
  }

  export type ForgottenCartUncheckedCreateInput = {
    id?: string
    created_at?: Date | string
    updated_at?: Date | string
    user_id: string
    product_id: string
    amount: number
  }

  export type ForgottenCartUpdateInput = {
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    user_id?: StringFieldUpdateOperationsInput | string
    product_id?: StringFieldUpdateOperationsInput | string
    amount?: IntFieldUpdateOperationsInput | number
  }

  export type ForgottenCartUncheckedUpdateInput = {
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    user_id?: StringFieldUpdateOperationsInput | string
    product_id?: StringFieldUpdateOperationsInput | string
    amount?: IntFieldUpdateOperationsInput | number
  }

  export type ForgottenCartCreateManyInput = {
    id?: string
    created_at?: Date | string
    updated_at?: Date | string
    user_id: string
    product_id: string
    amount: number
  }

  export type ForgottenCartUpdateManyMutationInput = {
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    user_id?: StringFieldUpdateOperationsInput | string
    product_id?: StringFieldUpdateOperationsInput | string
    amount?: IntFieldUpdateOperationsInput | number
  }

  export type ForgottenCartUncheckedUpdateManyInput = {
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    user_id?: StringFieldUpdateOperationsInput | string
    product_id?: StringFieldUpdateOperationsInput | string
    amount?: IntFieldUpdateOperationsInput | number
  }

  export type StringFilter = {
    equals?: string
    in?: Enumerable<string>
    notIn?: Enumerable<string>
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    mode?: QueryMode
    not?: NestedStringFilter | string
  }
  export type JsonFilter = 
    | PatchUndefined<
        Either<Required<JsonFilterBase>, Exclude<keyof Required<JsonFilterBase>, 'path'>>,
        Required<JsonFilterBase>
      >
    | OptionalFlat<Omit<Required<JsonFilterBase>, 'path'>>

  export type JsonFilterBase = {
    equals?: InputJsonValue
    not?: InputJsonValue
  }

  export type DateTimeFilter = {
    equals?: Date | string
    in?: Enumerable<Date> | Enumerable<string>
    notIn?: Enumerable<Date> | Enumerable<string>
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeFilter | Date | string
  }

  export type PageAccessCounterCountOrderByAggregateInput = {
    id?: SortOrder
    metadata?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type PageAccessCounterMaxOrderByAggregateInput = {
    id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type PageAccessCounterMinOrderByAggregateInput = {
    id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type StringWithAggregatesFilter = {
    equals?: string
    in?: Enumerable<string>
    notIn?: Enumerable<string>
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter | string
    _count?: NestedIntFilter
    _min?: NestedStringFilter
    _max?: NestedStringFilter
  }
  export type JsonWithAggregatesFilter = 
    | PatchUndefined<
        Either<Required<JsonWithAggregatesFilterBase>, Exclude<keyof Required<JsonWithAggregatesFilterBase>, 'path'>>,
        Required<JsonWithAggregatesFilterBase>
      >
    | OptionalFlat<Omit<Required<JsonWithAggregatesFilterBase>, 'path'>>

  export type JsonWithAggregatesFilterBase = {
    equals?: InputJsonValue
    not?: InputJsonValue
    _count?: NestedIntFilter
    _min?: NestedJsonFilter
    _max?: NestedJsonFilter
  }

  export type DateTimeWithAggregatesFilter = {
    equals?: Date | string
    in?: Enumerable<Date> | Enumerable<string>
    notIn?: Enumerable<Date> | Enumerable<string>
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeWithAggregatesFilter | Date | string
    _count?: NestedIntFilter
    _min?: NestedDateTimeFilter
    _max?: NestedDateTimeFilter
  }

  export type IntFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntFilter | number
  }

  export type ForgottenCartCountOrderByAggregateInput = {
    id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    user_id?: SortOrder
    product_id?: SortOrder
    amount?: SortOrder
  }

  export type ForgottenCartAvgOrderByAggregateInput = {
    amount?: SortOrder
  }

  export type ForgottenCartMaxOrderByAggregateInput = {
    id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    user_id?: SortOrder
    product_id?: SortOrder
    amount?: SortOrder
  }

  export type ForgottenCartMinOrderByAggregateInput = {
    id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    user_id?: SortOrder
    product_id?: SortOrder
    amount?: SortOrder
  }

  export type ForgottenCartSumOrderByAggregateInput = {
    amount?: SortOrder
  }

  export type IntWithAggregatesFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntWithAggregatesFilter | number
    _count?: NestedIntFilter
    _avg?: NestedFloatFilter
    _sum?: NestedIntFilter
    _min?: NestedIntFilter
    _max?: NestedIntFilter
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NestedStringFilter = {
    equals?: string
    in?: Enumerable<string>
    notIn?: Enumerable<string>
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringFilter | string
  }

  export type NestedDateTimeFilter = {
    equals?: Date | string
    in?: Enumerable<Date> | Enumerable<string>
    notIn?: Enumerable<Date> | Enumerable<string>
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeFilter | Date | string
  }

  export type NestedStringWithAggregatesFilter = {
    equals?: string
    in?: Enumerable<string>
    notIn?: Enumerable<string>
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringWithAggregatesFilter | string
    _count?: NestedIntFilter
    _min?: NestedStringFilter
    _max?: NestedStringFilter
  }

  export type NestedIntFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntFilter | number
  }
  export type NestedJsonFilter = 
    | PatchUndefined<
        Either<Required<NestedJsonFilterBase>, Exclude<keyof Required<NestedJsonFilterBase>, 'path'>>,
        Required<NestedJsonFilterBase>
      >
    | OptionalFlat<Omit<Required<NestedJsonFilterBase>, 'path'>>

  export type NestedJsonFilterBase = {
    equals?: InputJsonValue
    not?: InputJsonValue
  }

  export type NestedDateTimeWithAggregatesFilter = {
    equals?: Date | string
    in?: Enumerable<Date> | Enumerable<string>
    notIn?: Enumerable<Date> | Enumerable<string>
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeWithAggregatesFilter | Date | string
    _count?: NestedIntFilter
    _min?: NestedDateTimeFilter
    _max?: NestedDateTimeFilter
  }

  export type NestedIntWithAggregatesFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntWithAggregatesFilter | number
    _count?: NestedIntFilter
    _avg?: NestedFloatFilter
    _sum?: NestedIntFilter
    _min?: NestedIntFilter
    _max?: NestedIntFilter
  }

  export type NestedFloatFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedFloatFilter | number
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.DMMF.Document;
}