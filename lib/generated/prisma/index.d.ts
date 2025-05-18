
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model ChatMessage
 * 
 */
export type ChatMessage = $Result.DefaultSelection<Prisma.$ChatMessagePayload>
/**
 * Model ChatChannel
 * 
 */
export type ChatChannel = $Result.DefaultSelection<Prisma.$ChatChannelPayload>
/**
 * Model ChatUser
 * 
 */
export type ChatUser = $Result.DefaultSelection<Prisma.$ChatUserPayload>
/**
 * Model ChatAttachment
 * 
 */
export type ChatAttachment = $Result.DefaultSelection<Prisma.$ChatAttachmentPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more ChatMessages
 * const chatMessages = await prisma.chatMessage.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more ChatMessages
   * const chatMessages = await prisma.chatMessage.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
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
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P]): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number }): $Utils.JsPromise<R>

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
  $runCommandRaw(command: Prisma.InputJsonObject): Prisma.PrismaPromise<Prisma.JsonObject>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.chatMessage`: Exposes CRUD operations for the **ChatMessage** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ChatMessages
    * const chatMessages = await prisma.chatMessage.findMany()
    * ```
    */
  get chatMessage(): Prisma.ChatMessageDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.chatChannel`: Exposes CRUD operations for the **ChatChannel** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ChatChannels
    * const chatChannels = await prisma.chatChannel.findMany()
    * ```
    */
  get chatChannel(): Prisma.ChatChannelDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.chatUser`: Exposes CRUD operations for the **ChatUser** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ChatUsers
    * const chatUsers = await prisma.chatUser.findMany()
    * ```
    */
  get chatUser(): Prisma.ChatUserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.chatAttachment`: Exposes CRUD operations for the **ChatAttachment** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ChatAttachments
    * const chatAttachments = await prisma.chatAttachment.findMany()
    * ```
    */
  get chatAttachment(): Prisma.ChatAttachmentDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

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

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.6.0
   * Query Engine version: f676762280b54cd07c770017ed3711ddde35f37a
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

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

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

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
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
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
  : T extends Uint8Array
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

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

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

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



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
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    ChatMessage: 'ChatMessage',
    ChatChannel: 'ChatChannel',
    ChatUser: 'ChatUser',
    ChatAttachment: 'ChatAttachment'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "chatMessage" | "chatChannel" | "chatUser" | "chatAttachment"
      txIsolationLevel: never
    }
    model: {
      ChatMessage: {
        payload: Prisma.$ChatMessagePayload<ExtArgs>
        fields: Prisma.ChatMessageFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ChatMessageFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatMessagePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ChatMessageFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatMessagePayload>
          }
          findFirst: {
            args: Prisma.ChatMessageFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatMessagePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ChatMessageFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatMessagePayload>
          }
          findMany: {
            args: Prisma.ChatMessageFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatMessagePayload>[]
          }
          create: {
            args: Prisma.ChatMessageCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatMessagePayload>
          }
          createMany: {
            args: Prisma.ChatMessageCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.ChatMessageDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatMessagePayload>
          }
          update: {
            args: Prisma.ChatMessageUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatMessagePayload>
          }
          deleteMany: {
            args: Prisma.ChatMessageDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ChatMessageUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ChatMessageUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatMessagePayload>
          }
          aggregate: {
            args: Prisma.ChatMessageAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateChatMessage>
          }
          groupBy: {
            args: Prisma.ChatMessageGroupByArgs<ExtArgs>
            result: $Utils.Optional<ChatMessageGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.ChatMessageFindRawArgs<ExtArgs>
            result: JsonObject
          }
          aggregateRaw: {
            args: Prisma.ChatMessageAggregateRawArgs<ExtArgs>
            result: JsonObject
          }
          count: {
            args: Prisma.ChatMessageCountArgs<ExtArgs>
            result: $Utils.Optional<ChatMessageCountAggregateOutputType> | number
          }
        }
      }
      ChatChannel: {
        payload: Prisma.$ChatChannelPayload<ExtArgs>
        fields: Prisma.ChatChannelFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ChatChannelFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatChannelPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ChatChannelFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatChannelPayload>
          }
          findFirst: {
            args: Prisma.ChatChannelFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatChannelPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ChatChannelFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatChannelPayload>
          }
          findMany: {
            args: Prisma.ChatChannelFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatChannelPayload>[]
          }
          create: {
            args: Prisma.ChatChannelCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatChannelPayload>
          }
          createMany: {
            args: Prisma.ChatChannelCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.ChatChannelDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatChannelPayload>
          }
          update: {
            args: Prisma.ChatChannelUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatChannelPayload>
          }
          deleteMany: {
            args: Prisma.ChatChannelDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ChatChannelUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ChatChannelUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatChannelPayload>
          }
          aggregate: {
            args: Prisma.ChatChannelAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateChatChannel>
          }
          groupBy: {
            args: Prisma.ChatChannelGroupByArgs<ExtArgs>
            result: $Utils.Optional<ChatChannelGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.ChatChannelFindRawArgs<ExtArgs>
            result: JsonObject
          }
          aggregateRaw: {
            args: Prisma.ChatChannelAggregateRawArgs<ExtArgs>
            result: JsonObject
          }
          count: {
            args: Prisma.ChatChannelCountArgs<ExtArgs>
            result: $Utils.Optional<ChatChannelCountAggregateOutputType> | number
          }
        }
      }
      ChatUser: {
        payload: Prisma.$ChatUserPayload<ExtArgs>
        fields: Prisma.ChatUserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ChatUserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatUserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ChatUserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatUserPayload>
          }
          findFirst: {
            args: Prisma.ChatUserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatUserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ChatUserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatUserPayload>
          }
          findMany: {
            args: Prisma.ChatUserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatUserPayload>[]
          }
          create: {
            args: Prisma.ChatUserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatUserPayload>
          }
          createMany: {
            args: Prisma.ChatUserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.ChatUserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatUserPayload>
          }
          update: {
            args: Prisma.ChatUserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatUserPayload>
          }
          deleteMany: {
            args: Prisma.ChatUserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ChatUserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ChatUserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatUserPayload>
          }
          aggregate: {
            args: Prisma.ChatUserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateChatUser>
          }
          groupBy: {
            args: Prisma.ChatUserGroupByArgs<ExtArgs>
            result: $Utils.Optional<ChatUserGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.ChatUserFindRawArgs<ExtArgs>
            result: JsonObject
          }
          aggregateRaw: {
            args: Prisma.ChatUserAggregateRawArgs<ExtArgs>
            result: JsonObject
          }
          count: {
            args: Prisma.ChatUserCountArgs<ExtArgs>
            result: $Utils.Optional<ChatUserCountAggregateOutputType> | number
          }
        }
      }
      ChatAttachment: {
        payload: Prisma.$ChatAttachmentPayload<ExtArgs>
        fields: Prisma.ChatAttachmentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ChatAttachmentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatAttachmentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ChatAttachmentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatAttachmentPayload>
          }
          findFirst: {
            args: Prisma.ChatAttachmentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatAttachmentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ChatAttachmentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatAttachmentPayload>
          }
          findMany: {
            args: Prisma.ChatAttachmentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatAttachmentPayload>[]
          }
          create: {
            args: Prisma.ChatAttachmentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatAttachmentPayload>
          }
          createMany: {
            args: Prisma.ChatAttachmentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.ChatAttachmentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatAttachmentPayload>
          }
          update: {
            args: Prisma.ChatAttachmentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatAttachmentPayload>
          }
          deleteMany: {
            args: Prisma.ChatAttachmentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ChatAttachmentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ChatAttachmentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatAttachmentPayload>
          }
          aggregate: {
            args: Prisma.ChatAttachmentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateChatAttachment>
          }
          groupBy: {
            args: Prisma.ChatAttachmentGroupByArgs<ExtArgs>
            result: $Utils.Optional<ChatAttachmentGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.ChatAttachmentFindRawArgs<ExtArgs>
            result: JsonObject
          }
          aggregateRaw: {
            args: Prisma.ChatAttachmentAggregateRawArgs<ExtArgs>
            result: JsonObject
          }
          count: {
            args: Prisma.ChatAttachmentCountArgs<ExtArgs>
            result: $Utils.Optional<ChatAttachmentCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $runCommandRaw: {
          args: Prisma.InputJsonObject,
          result: Prisma.JsonObject
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
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
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    chatMessage?: ChatMessageOmit
    chatChannel?: ChatChannelOmit
    chatUser?: ChatUserOmit
    chatAttachment?: ChatAttachmentOmit
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
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
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
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

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
   * Model ChatMessage
   */

  export type AggregateChatMessage = {
    _count: ChatMessageCountAggregateOutputType | null
    _min: ChatMessageMinAggregateOutputType | null
    _max: ChatMessageMaxAggregateOutputType | null
  }

  export type ChatMessageMinAggregateOutputType = {
    id: string | null
    senderId: string | null
    senderName: string | null
    content: string | null
    recipientId: string | null
    channelName: string | null
    recipientName: string | null
    recipientAvatar: string | null
    timestamp: Date | null
    status: string | null
    type: string | null
    sentiment: string | null
    aiGenerated: boolean | null
    effect: string | null
    priority: string | null
    bookmarked: boolean | null
    threadId: string | null
    edited: boolean | null
    expiresAt: Date | null
  }

  export type ChatMessageMaxAggregateOutputType = {
    id: string | null
    senderId: string | null
    senderName: string | null
    content: string | null
    recipientId: string | null
    channelName: string | null
    recipientName: string | null
    recipientAvatar: string | null
    timestamp: Date | null
    status: string | null
    type: string | null
    sentiment: string | null
    aiGenerated: boolean | null
    effect: string | null
    priority: string | null
    bookmarked: boolean | null
    threadId: string | null
    edited: boolean | null
    expiresAt: Date | null
  }

  export type ChatMessageCountAggregateOutputType = {
    id: number
    senderId: number
    senderName: number
    content: number
    recipientId: number
    channelName: number
    recipientName: number
    recipientAvatar: number
    timestamp: number
    status: number
    type: number
    sentiment: number
    translation: number
    aiGenerated: number
    contextData: number
    effect: number
    priority: number
    reactions: number
    bookmarked: number
    spatial: number
    metadata: number
    attachments: number
    threadId: number
    edited: number
    editHistory: number
    mentions: number
    tags: number
    readBy: number
    expiresAt: number
    _all: number
  }


  export type ChatMessageMinAggregateInputType = {
    id?: true
    senderId?: true
    senderName?: true
    content?: true
    recipientId?: true
    channelName?: true
    recipientName?: true
    recipientAvatar?: true
    timestamp?: true
    status?: true
    type?: true
    sentiment?: true
    aiGenerated?: true
    effect?: true
    priority?: true
    bookmarked?: true
    threadId?: true
    edited?: true
    expiresAt?: true
  }

  export type ChatMessageMaxAggregateInputType = {
    id?: true
    senderId?: true
    senderName?: true
    content?: true
    recipientId?: true
    channelName?: true
    recipientName?: true
    recipientAvatar?: true
    timestamp?: true
    status?: true
    type?: true
    sentiment?: true
    aiGenerated?: true
    effect?: true
    priority?: true
    bookmarked?: true
    threadId?: true
    edited?: true
    expiresAt?: true
  }

  export type ChatMessageCountAggregateInputType = {
    id?: true
    senderId?: true
    senderName?: true
    content?: true
    recipientId?: true
    channelName?: true
    recipientName?: true
    recipientAvatar?: true
    timestamp?: true
    status?: true
    type?: true
    sentiment?: true
    translation?: true
    aiGenerated?: true
    contextData?: true
    effect?: true
    priority?: true
    reactions?: true
    bookmarked?: true
    spatial?: true
    metadata?: true
    attachments?: true
    threadId?: true
    edited?: true
    editHistory?: true
    mentions?: true
    tags?: true
    readBy?: true
    expiresAt?: true
    _all?: true
  }

  export type ChatMessageAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ChatMessage to aggregate.
     */
    where?: ChatMessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ChatMessages to fetch.
     */
    orderBy?: ChatMessageOrderByWithRelationInput | ChatMessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ChatMessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ChatMessages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ChatMessages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ChatMessages
    **/
    _count?: true | ChatMessageCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ChatMessageMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ChatMessageMaxAggregateInputType
  }

  export type GetChatMessageAggregateType<T extends ChatMessageAggregateArgs> = {
        [P in keyof T & keyof AggregateChatMessage]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateChatMessage[P]>
      : GetScalarType<T[P], AggregateChatMessage[P]>
  }




  export type ChatMessageGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ChatMessageWhereInput
    orderBy?: ChatMessageOrderByWithAggregationInput | ChatMessageOrderByWithAggregationInput[]
    by: ChatMessageScalarFieldEnum[] | ChatMessageScalarFieldEnum
    having?: ChatMessageScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ChatMessageCountAggregateInputType | true
    _min?: ChatMessageMinAggregateInputType
    _max?: ChatMessageMaxAggregateInputType
  }

  export type ChatMessageGroupByOutputType = {
    id: string
    senderId: string
    senderName: string
    content: string
    recipientId: string | null
    channelName: string
    recipientName: string | null
    recipientAvatar: string | null
    timestamp: Date
    status: string
    type: string
    sentiment: string | null
    translation: JsonValue | null
    aiGenerated: boolean
    contextData: JsonValue | null
    effect: string | null
    priority: string
    reactions: JsonValue | null
    bookmarked: boolean
    spatial: JsonValue | null
    metadata: JsonValue | null
    attachments: JsonValue | null
    threadId: string | null
    edited: boolean
    editHistory: JsonValue | null
    mentions: JsonValue | null
    tags: string[]
    readBy: string[]
    expiresAt: Date | null
    _count: ChatMessageCountAggregateOutputType | null
    _min: ChatMessageMinAggregateOutputType | null
    _max: ChatMessageMaxAggregateOutputType | null
  }

  type GetChatMessageGroupByPayload<T extends ChatMessageGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ChatMessageGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ChatMessageGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ChatMessageGroupByOutputType[P]>
            : GetScalarType<T[P], ChatMessageGroupByOutputType[P]>
        }
      >
    >


  export type ChatMessageSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    senderId?: boolean
    senderName?: boolean
    content?: boolean
    recipientId?: boolean
    channelName?: boolean
    recipientName?: boolean
    recipientAvatar?: boolean
    timestamp?: boolean
    status?: boolean
    type?: boolean
    sentiment?: boolean
    translation?: boolean
    aiGenerated?: boolean
    contextData?: boolean
    effect?: boolean
    priority?: boolean
    reactions?: boolean
    bookmarked?: boolean
    spatial?: boolean
    metadata?: boolean
    attachments?: boolean
    threadId?: boolean
    edited?: boolean
    editHistory?: boolean
    mentions?: boolean
    tags?: boolean
    readBy?: boolean
    expiresAt?: boolean
  }, ExtArgs["result"]["chatMessage"]>



  export type ChatMessageSelectScalar = {
    id?: boolean
    senderId?: boolean
    senderName?: boolean
    content?: boolean
    recipientId?: boolean
    channelName?: boolean
    recipientName?: boolean
    recipientAvatar?: boolean
    timestamp?: boolean
    status?: boolean
    type?: boolean
    sentiment?: boolean
    translation?: boolean
    aiGenerated?: boolean
    contextData?: boolean
    effect?: boolean
    priority?: boolean
    reactions?: boolean
    bookmarked?: boolean
    spatial?: boolean
    metadata?: boolean
    attachments?: boolean
    threadId?: boolean
    edited?: boolean
    editHistory?: boolean
    mentions?: boolean
    tags?: boolean
    readBy?: boolean
    expiresAt?: boolean
  }

  export type ChatMessageOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "senderId" | "senderName" | "content" | "recipientId" | "channelName" | "recipientName" | "recipientAvatar" | "timestamp" | "status" | "type" | "sentiment" | "translation" | "aiGenerated" | "contextData" | "effect" | "priority" | "reactions" | "bookmarked" | "spatial" | "metadata" | "attachments" | "threadId" | "edited" | "editHistory" | "mentions" | "tags" | "readBy" | "expiresAt", ExtArgs["result"]["chatMessage"]>

  export type $ChatMessagePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ChatMessage"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      senderId: string
      senderName: string
      content: string
      recipientId: string | null
      channelName: string
      recipientName: string | null
      recipientAvatar: string | null
      timestamp: Date
      status: string
      type: string
      sentiment: string | null
      translation: Prisma.JsonValue | null
      aiGenerated: boolean
      contextData: Prisma.JsonValue | null
      effect: string | null
      priority: string
      reactions: Prisma.JsonValue | null
      bookmarked: boolean
      spatial: Prisma.JsonValue | null
      metadata: Prisma.JsonValue | null
      attachments: Prisma.JsonValue | null
      threadId: string | null
      edited: boolean
      editHistory: Prisma.JsonValue | null
      mentions: Prisma.JsonValue | null
      tags: string[]
      readBy: string[]
      expiresAt: Date | null
    }, ExtArgs["result"]["chatMessage"]>
    composites: {}
  }

  type ChatMessageGetPayload<S extends boolean | null | undefined | ChatMessageDefaultArgs> = $Result.GetResult<Prisma.$ChatMessagePayload, S>

  type ChatMessageCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ChatMessageFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ChatMessageCountAggregateInputType | true
    }

  export interface ChatMessageDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ChatMessage'], meta: { name: 'ChatMessage' } }
    /**
     * Find zero or one ChatMessage that matches the filter.
     * @param {ChatMessageFindUniqueArgs} args - Arguments to find a ChatMessage
     * @example
     * // Get one ChatMessage
     * const chatMessage = await prisma.chatMessage.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ChatMessageFindUniqueArgs>(args: SelectSubset<T, ChatMessageFindUniqueArgs<ExtArgs>>): Prisma__ChatMessageClient<$Result.GetResult<Prisma.$ChatMessagePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ChatMessage that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ChatMessageFindUniqueOrThrowArgs} args - Arguments to find a ChatMessage
     * @example
     * // Get one ChatMessage
     * const chatMessage = await prisma.chatMessage.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ChatMessageFindUniqueOrThrowArgs>(args: SelectSubset<T, ChatMessageFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ChatMessageClient<$Result.GetResult<Prisma.$ChatMessagePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ChatMessage that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatMessageFindFirstArgs} args - Arguments to find a ChatMessage
     * @example
     * // Get one ChatMessage
     * const chatMessage = await prisma.chatMessage.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ChatMessageFindFirstArgs>(args?: SelectSubset<T, ChatMessageFindFirstArgs<ExtArgs>>): Prisma__ChatMessageClient<$Result.GetResult<Prisma.$ChatMessagePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ChatMessage that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatMessageFindFirstOrThrowArgs} args - Arguments to find a ChatMessage
     * @example
     * // Get one ChatMessage
     * const chatMessage = await prisma.chatMessage.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ChatMessageFindFirstOrThrowArgs>(args?: SelectSubset<T, ChatMessageFindFirstOrThrowArgs<ExtArgs>>): Prisma__ChatMessageClient<$Result.GetResult<Prisma.$ChatMessagePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ChatMessages that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatMessageFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ChatMessages
     * const chatMessages = await prisma.chatMessage.findMany()
     * 
     * // Get first 10 ChatMessages
     * const chatMessages = await prisma.chatMessage.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const chatMessageWithIdOnly = await prisma.chatMessage.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ChatMessageFindManyArgs>(args?: SelectSubset<T, ChatMessageFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ChatMessagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ChatMessage.
     * @param {ChatMessageCreateArgs} args - Arguments to create a ChatMessage.
     * @example
     * // Create one ChatMessage
     * const ChatMessage = await prisma.chatMessage.create({
     *   data: {
     *     // ... data to create a ChatMessage
     *   }
     * })
     * 
     */
    create<T extends ChatMessageCreateArgs>(args: SelectSubset<T, ChatMessageCreateArgs<ExtArgs>>): Prisma__ChatMessageClient<$Result.GetResult<Prisma.$ChatMessagePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ChatMessages.
     * @param {ChatMessageCreateManyArgs} args - Arguments to create many ChatMessages.
     * @example
     * // Create many ChatMessages
     * const chatMessage = await prisma.chatMessage.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ChatMessageCreateManyArgs>(args?: SelectSubset<T, ChatMessageCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a ChatMessage.
     * @param {ChatMessageDeleteArgs} args - Arguments to delete one ChatMessage.
     * @example
     * // Delete one ChatMessage
     * const ChatMessage = await prisma.chatMessage.delete({
     *   where: {
     *     // ... filter to delete one ChatMessage
     *   }
     * })
     * 
     */
    delete<T extends ChatMessageDeleteArgs>(args: SelectSubset<T, ChatMessageDeleteArgs<ExtArgs>>): Prisma__ChatMessageClient<$Result.GetResult<Prisma.$ChatMessagePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ChatMessage.
     * @param {ChatMessageUpdateArgs} args - Arguments to update one ChatMessage.
     * @example
     * // Update one ChatMessage
     * const chatMessage = await prisma.chatMessage.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ChatMessageUpdateArgs>(args: SelectSubset<T, ChatMessageUpdateArgs<ExtArgs>>): Prisma__ChatMessageClient<$Result.GetResult<Prisma.$ChatMessagePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ChatMessages.
     * @param {ChatMessageDeleteManyArgs} args - Arguments to filter ChatMessages to delete.
     * @example
     * // Delete a few ChatMessages
     * const { count } = await prisma.chatMessage.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ChatMessageDeleteManyArgs>(args?: SelectSubset<T, ChatMessageDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ChatMessages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatMessageUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ChatMessages
     * const chatMessage = await prisma.chatMessage.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ChatMessageUpdateManyArgs>(args: SelectSubset<T, ChatMessageUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one ChatMessage.
     * @param {ChatMessageUpsertArgs} args - Arguments to update or create a ChatMessage.
     * @example
     * // Update or create a ChatMessage
     * const chatMessage = await prisma.chatMessage.upsert({
     *   create: {
     *     // ... data to create a ChatMessage
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ChatMessage we want to update
     *   }
     * })
     */
    upsert<T extends ChatMessageUpsertArgs>(args: SelectSubset<T, ChatMessageUpsertArgs<ExtArgs>>): Prisma__ChatMessageClient<$Result.GetResult<Prisma.$ChatMessagePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ChatMessages that matches the filter.
     * @param {ChatMessageFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const chatMessage = await prisma.chatMessage.findRaw({
     *   filter: { age: { $gt: 25 } }
     * })
     */
    findRaw(args?: ChatMessageFindRawArgs): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a ChatMessage.
     * @param {ChatMessageAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const chatMessage = await prisma.chatMessage.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(args?: ChatMessageAggregateRawArgs): Prisma.PrismaPromise<JsonObject>


    /**
     * Count the number of ChatMessages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatMessageCountArgs} args - Arguments to filter ChatMessages to count.
     * @example
     * // Count the number of ChatMessages
     * const count = await prisma.chatMessage.count({
     *   where: {
     *     // ... the filter for the ChatMessages we want to count
     *   }
     * })
    **/
    count<T extends ChatMessageCountArgs>(
      args?: Subset<T, ChatMessageCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ChatMessageCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ChatMessage.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatMessageAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ChatMessageAggregateArgs>(args: Subset<T, ChatMessageAggregateArgs>): Prisma.PrismaPromise<GetChatMessageAggregateType<T>>

    /**
     * Group by ChatMessage.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatMessageGroupByArgs} args - Group by arguments.
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
      T extends ChatMessageGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ChatMessageGroupByArgs['orderBy'] }
        : { orderBy?: ChatMessageGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
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
    >(args: SubsetIntersection<T, ChatMessageGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetChatMessageGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ChatMessage model
   */
  readonly fields: ChatMessageFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ChatMessage.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ChatMessageClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ChatMessage model
   */
  interface ChatMessageFieldRefs {
    readonly id: FieldRef<"ChatMessage", 'String'>
    readonly senderId: FieldRef<"ChatMessage", 'String'>
    readonly senderName: FieldRef<"ChatMessage", 'String'>
    readonly content: FieldRef<"ChatMessage", 'String'>
    readonly recipientId: FieldRef<"ChatMessage", 'String'>
    readonly channelName: FieldRef<"ChatMessage", 'String'>
    readonly recipientName: FieldRef<"ChatMessage", 'String'>
    readonly recipientAvatar: FieldRef<"ChatMessage", 'String'>
    readonly timestamp: FieldRef<"ChatMessage", 'DateTime'>
    readonly status: FieldRef<"ChatMessage", 'String'>
    readonly type: FieldRef<"ChatMessage", 'String'>
    readonly sentiment: FieldRef<"ChatMessage", 'String'>
    readonly translation: FieldRef<"ChatMessage", 'Json'>
    readonly aiGenerated: FieldRef<"ChatMessage", 'Boolean'>
    readonly contextData: FieldRef<"ChatMessage", 'Json'>
    readonly effect: FieldRef<"ChatMessage", 'String'>
    readonly priority: FieldRef<"ChatMessage", 'String'>
    readonly reactions: FieldRef<"ChatMessage", 'Json'>
    readonly bookmarked: FieldRef<"ChatMessage", 'Boolean'>
    readonly spatial: FieldRef<"ChatMessage", 'Json'>
    readonly metadata: FieldRef<"ChatMessage", 'Json'>
    readonly attachments: FieldRef<"ChatMessage", 'Json'>
    readonly threadId: FieldRef<"ChatMessage", 'String'>
    readonly edited: FieldRef<"ChatMessage", 'Boolean'>
    readonly editHistory: FieldRef<"ChatMessage", 'Json'>
    readonly mentions: FieldRef<"ChatMessage", 'Json'>
    readonly tags: FieldRef<"ChatMessage", 'String[]'>
    readonly readBy: FieldRef<"ChatMessage", 'String[]'>
    readonly expiresAt: FieldRef<"ChatMessage", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ChatMessage findUnique
   */
  export type ChatMessageFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatMessage
     */
    select?: ChatMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatMessage
     */
    omit?: ChatMessageOmit<ExtArgs> | null
    /**
     * Filter, which ChatMessage to fetch.
     */
    where: ChatMessageWhereUniqueInput
  }

  /**
   * ChatMessage findUniqueOrThrow
   */
  export type ChatMessageFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatMessage
     */
    select?: ChatMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatMessage
     */
    omit?: ChatMessageOmit<ExtArgs> | null
    /**
     * Filter, which ChatMessage to fetch.
     */
    where: ChatMessageWhereUniqueInput
  }

  /**
   * ChatMessage findFirst
   */
  export type ChatMessageFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatMessage
     */
    select?: ChatMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatMessage
     */
    omit?: ChatMessageOmit<ExtArgs> | null
    /**
     * Filter, which ChatMessage to fetch.
     */
    where?: ChatMessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ChatMessages to fetch.
     */
    orderBy?: ChatMessageOrderByWithRelationInput | ChatMessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ChatMessages.
     */
    cursor?: ChatMessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ChatMessages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ChatMessages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ChatMessages.
     */
    distinct?: ChatMessageScalarFieldEnum | ChatMessageScalarFieldEnum[]
  }

  /**
   * ChatMessage findFirstOrThrow
   */
  export type ChatMessageFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatMessage
     */
    select?: ChatMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatMessage
     */
    omit?: ChatMessageOmit<ExtArgs> | null
    /**
     * Filter, which ChatMessage to fetch.
     */
    where?: ChatMessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ChatMessages to fetch.
     */
    orderBy?: ChatMessageOrderByWithRelationInput | ChatMessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ChatMessages.
     */
    cursor?: ChatMessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ChatMessages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ChatMessages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ChatMessages.
     */
    distinct?: ChatMessageScalarFieldEnum | ChatMessageScalarFieldEnum[]
  }

  /**
   * ChatMessage findMany
   */
  export type ChatMessageFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatMessage
     */
    select?: ChatMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatMessage
     */
    omit?: ChatMessageOmit<ExtArgs> | null
    /**
     * Filter, which ChatMessages to fetch.
     */
    where?: ChatMessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ChatMessages to fetch.
     */
    orderBy?: ChatMessageOrderByWithRelationInput | ChatMessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ChatMessages.
     */
    cursor?: ChatMessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ChatMessages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ChatMessages.
     */
    skip?: number
    distinct?: ChatMessageScalarFieldEnum | ChatMessageScalarFieldEnum[]
  }

  /**
   * ChatMessage create
   */
  export type ChatMessageCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatMessage
     */
    select?: ChatMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatMessage
     */
    omit?: ChatMessageOmit<ExtArgs> | null
    /**
     * The data needed to create a ChatMessage.
     */
    data: XOR<ChatMessageCreateInput, ChatMessageUncheckedCreateInput>
  }

  /**
   * ChatMessage createMany
   */
  export type ChatMessageCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ChatMessages.
     */
    data: ChatMessageCreateManyInput | ChatMessageCreateManyInput[]
  }

  /**
   * ChatMessage update
   */
  export type ChatMessageUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatMessage
     */
    select?: ChatMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatMessage
     */
    omit?: ChatMessageOmit<ExtArgs> | null
    /**
     * The data needed to update a ChatMessage.
     */
    data: XOR<ChatMessageUpdateInput, ChatMessageUncheckedUpdateInput>
    /**
     * Choose, which ChatMessage to update.
     */
    where: ChatMessageWhereUniqueInput
  }

  /**
   * ChatMessage updateMany
   */
  export type ChatMessageUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ChatMessages.
     */
    data: XOR<ChatMessageUpdateManyMutationInput, ChatMessageUncheckedUpdateManyInput>
    /**
     * Filter which ChatMessages to update
     */
    where?: ChatMessageWhereInput
    /**
     * Limit how many ChatMessages to update.
     */
    limit?: number
  }

  /**
   * ChatMessage upsert
   */
  export type ChatMessageUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatMessage
     */
    select?: ChatMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatMessage
     */
    omit?: ChatMessageOmit<ExtArgs> | null
    /**
     * The filter to search for the ChatMessage to update in case it exists.
     */
    where: ChatMessageWhereUniqueInput
    /**
     * In case the ChatMessage found by the `where` argument doesn't exist, create a new ChatMessage with this data.
     */
    create: XOR<ChatMessageCreateInput, ChatMessageUncheckedCreateInput>
    /**
     * In case the ChatMessage was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ChatMessageUpdateInput, ChatMessageUncheckedUpdateInput>
  }

  /**
   * ChatMessage delete
   */
  export type ChatMessageDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatMessage
     */
    select?: ChatMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatMessage
     */
    omit?: ChatMessageOmit<ExtArgs> | null
    /**
     * Filter which ChatMessage to delete.
     */
    where: ChatMessageWhereUniqueInput
  }

  /**
   * ChatMessage deleteMany
   */
  export type ChatMessageDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ChatMessages to delete
     */
    where?: ChatMessageWhereInput
    /**
     * Limit how many ChatMessages to delete.
     */
    limit?: number
  }

  /**
   * ChatMessage findRaw
   */
  export type ChatMessageFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * ChatMessage aggregateRaw
   */
  export type ChatMessageAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * ChatMessage without action
   */
  export type ChatMessageDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatMessage
     */
    select?: ChatMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatMessage
     */
    omit?: ChatMessageOmit<ExtArgs> | null
  }


  /**
   * Model ChatChannel
   */

  export type AggregateChatChannel = {
    _count: ChatChannelCountAggregateOutputType | null
    _min: ChatChannelMinAggregateOutputType | null
    _max: ChatChannelMaxAggregateOutputType | null
  }

  export type ChatChannelMinAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    createdAt: Date | null
    createdBy: string | null
    isPrivate: boolean | null
    avatar: string | null
    lastActive: Date | null
  }

  export type ChatChannelMaxAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    createdAt: Date | null
    createdBy: string | null
    isPrivate: boolean | null
    avatar: string | null
    lastActive: Date | null
  }

  export type ChatChannelCountAggregateOutputType = {
    id: number
    name: number
    description: number
    createdAt: number
    createdBy: number
    isPrivate: number
    members: number
    admins: number
    metadata: number
    avatar: number
    lastActive: number
    _all: number
  }


  export type ChatChannelMinAggregateInputType = {
    id?: true
    name?: true
    description?: true
    createdAt?: true
    createdBy?: true
    isPrivate?: true
    avatar?: true
    lastActive?: true
  }

  export type ChatChannelMaxAggregateInputType = {
    id?: true
    name?: true
    description?: true
    createdAt?: true
    createdBy?: true
    isPrivate?: true
    avatar?: true
    lastActive?: true
  }

  export type ChatChannelCountAggregateInputType = {
    id?: true
    name?: true
    description?: true
    createdAt?: true
    createdBy?: true
    isPrivate?: true
    members?: true
    admins?: true
    metadata?: true
    avatar?: true
    lastActive?: true
    _all?: true
  }

  export type ChatChannelAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ChatChannel to aggregate.
     */
    where?: ChatChannelWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ChatChannels to fetch.
     */
    orderBy?: ChatChannelOrderByWithRelationInput | ChatChannelOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ChatChannelWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ChatChannels from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ChatChannels.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ChatChannels
    **/
    _count?: true | ChatChannelCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ChatChannelMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ChatChannelMaxAggregateInputType
  }

  export type GetChatChannelAggregateType<T extends ChatChannelAggregateArgs> = {
        [P in keyof T & keyof AggregateChatChannel]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateChatChannel[P]>
      : GetScalarType<T[P], AggregateChatChannel[P]>
  }




  export type ChatChannelGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ChatChannelWhereInput
    orderBy?: ChatChannelOrderByWithAggregationInput | ChatChannelOrderByWithAggregationInput[]
    by: ChatChannelScalarFieldEnum[] | ChatChannelScalarFieldEnum
    having?: ChatChannelScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ChatChannelCountAggregateInputType | true
    _min?: ChatChannelMinAggregateInputType
    _max?: ChatChannelMaxAggregateInputType
  }

  export type ChatChannelGroupByOutputType = {
    id: string
    name: string
    description: string | null
    createdAt: Date
    createdBy: string
    isPrivate: boolean
    members: string[]
    admins: string[]
    metadata: JsonValue | null
    avatar: string | null
    lastActive: Date
    _count: ChatChannelCountAggregateOutputType | null
    _min: ChatChannelMinAggregateOutputType | null
    _max: ChatChannelMaxAggregateOutputType | null
  }

  type GetChatChannelGroupByPayload<T extends ChatChannelGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ChatChannelGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ChatChannelGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ChatChannelGroupByOutputType[P]>
            : GetScalarType<T[P], ChatChannelGroupByOutputType[P]>
        }
      >
    >


  export type ChatChannelSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    createdAt?: boolean
    createdBy?: boolean
    isPrivate?: boolean
    members?: boolean
    admins?: boolean
    metadata?: boolean
    avatar?: boolean
    lastActive?: boolean
  }, ExtArgs["result"]["chatChannel"]>



  export type ChatChannelSelectScalar = {
    id?: boolean
    name?: boolean
    description?: boolean
    createdAt?: boolean
    createdBy?: boolean
    isPrivate?: boolean
    members?: boolean
    admins?: boolean
    metadata?: boolean
    avatar?: boolean
    lastActive?: boolean
  }

  export type ChatChannelOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "description" | "createdAt" | "createdBy" | "isPrivate" | "members" | "admins" | "metadata" | "avatar" | "lastActive", ExtArgs["result"]["chatChannel"]>

  export type $ChatChannelPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ChatChannel"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      description: string | null
      createdAt: Date
      createdBy: string
      isPrivate: boolean
      members: string[]
      admins: string[]
      metadata: Prisma.JsonValue | null
      avatar: string | null
      lastActive: Date
    }, ExtArgs["result"]["chatChannel"]>
    composites: {}
  }

  type ChatChannelGetPayload<S extends boolean | null | undefined | ChatChannelDefaultArgs> = $Result.GetResult<Prisma.$ChatChannelPayload, S>

  type ChatChannelCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ChatChannelFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ChatChannelCountAggregateInputType | true
    }

  export interface ChatChannelDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ChatChannel'], meta: { name: 'ChatChannel' } }
    /**
     * Find zero or one ChatChannel that matches the filter.
     * @param {ChatChannelFindUniqueArgs} args - Arguments to find a ChatChannel
     * @example
     * // Get one ChatChannel
     * const chatChannel = await prisma.chatChannel.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ChatChannelFindUniqueArgs>(args: SelectSubset<T, ChatChannelFindUniqueArgs<ExtArgs>>): Prisma__ChatChannelClient<$Result.GetResult<Prisma.$ChatChannelPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ChatChannel that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ChatChannelFindUniqueOrThrowArgs} args - Arguments to find a ChatChannel
     * @example
     * // Get one ChatChannel
     * const chatChannel = await prisma.chatChannel.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ChatChannelFindUniqueOrThrowArgs>(args: SelectSubset<T, ChatChannelFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ChatChannelClient<$Result.GetResult<Prisma.$ChatChannelPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ChatChannel that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatChannelFindFirstArgs} args - Arguments to find a ChatChannel
     * @example
     * // Get one ChatChannel
     * const chatChannel = await prisma.chatChannel.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ChatChannelFindFirstArgs>(args?: SelectSubset<T, ChatChannelFindFirstArgs<ExtArgs>>): Prisma__ChatChannelClient<$Result.GetResult<Prisma.$ChatChannelPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ChatChannel that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatChannelFindFirstOrThrowArgs} args - Arguments to find a ChatChannel
     * @example
     * // Get one ChatChannel
     * const chatChannel = await prisma.chatChannel.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ChatChannelFindFirstOrThrowArgs>(args?: SelectSubset<T, ChatChannelFindFirstOrThrowArgs<ExtArgs>>): Prisma__ChatChannelClient<$Result.GetResult<Prisma.$ChatChannelPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ChatChannels that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatChannelFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ChatChannels
     * const chatChannels = await prisma.chatChannel.findMany()
     * 
     * // Get first 10 ChatChannels
     * const chatChannels = await prisma.chatChannel.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const chatChannelWithIdOnly = await prisma.chatChannel.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ChatChannelFindManyArgs>(args?: SelectSubset<T, ChatChannelFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ChatChannelPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ChatChannel.
     * @param {ChatChannelCreateArgs} args - Arguments to create a ChatChannel.
     * @example
     * // Create one ChatChannel
     * const ChatChannel = await prisma.chatChannel.create({
     *   data: {
     *     // ... data to create a ChatChannel
     *   }
     * })
     * 
     */
    create<T extends ChatChannelCreateArgs>(args: SelectSubset<T, ChatChannelCreateArgs<ExtArgs>>): Prisma__ChatChannelClient<$Result.GetResult<Prisma.$ChatChannelPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ChatChannels.
     * @param {ChatChannelCreateManyArgs} args - Arguments to create many ChatChannels.
     * @example
     * // Create many ChatChannels
     * const chatChannel = await prisma.chatChannel.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ChatChannelCreateManyArgs>(args?: SelectSubset<T, ChatChannelCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a ChatChannel.
     * @param {ChatChannelDeleteArgs} args - Arguments to delete one ChatChannel.
     * @example
     * // Delete one ChatChannel
     * const ChatChannel = await prisma.chatChannel.delete({
     *   where: {
     *     // ... filter to delete one ChatChannel
     *   }
     * })
     * 
     */
    delete<T extends ChatChannelDeleteArgs>(args: SelectSubset<T, ChatChannelDeleteArgs<ExtArgs>>): Prisma__ChatChannelClient<$Result.GetResult<Prisma.$ChatChannelPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ChatChannel.
     * @param {ChatChannelUpdateArgs} args - Arguments to update one ChatChannel.
     * @example
     * // Update one ChatChannel
     * const chatChannel = await prisma.chatChannel.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ChatChannelUpdateArgs>(args: SelectSubset<T, ChatChannelUpdateArgs<ExtArgs>>): Prisma__ChatChannelClient<$Result.GetResult<Prisma.$ChatChannelPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ChatChannels.
     * @param {ChatChannelDeleteManyArgs} args - Arguments to filter ChatChannels to delete.
     * @example
     * // Delete a few ChatChannels
     * const { count } = await prisma.chatChannel.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ChatChannelDeleteManyArgs>(args?: SelectSubset<T, ChatChannelDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ChatChannels.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatChannelUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ChatChannels
     * const chatChannel = await prisma.chatChannel.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ChatChannelUpdateManyArgs>(args: SelectSubset<T, ChatChannelUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one ChatChannel.
     * @param {ChatChannelUpsertArgs} args - Arguments to update or create a ChatChannel.
     * @example
     * // Update or create a ChatChannel
     * const chatChannel = await prisma.chatChannel.upsert({
     *   create: {
     *     // ... data to create a ChatChannel
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ChatChannel we want to update
     *   }
     * })
     */
    upsert<T extends ChatChannelUpsertArgs>(args: SelectSubset<T, ChatChannelUpsertArgs<ExtArgs>>): Prisma__ChatChannelClient<$Result.GetResult<Prisma.$ChatChannelPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ChatChannels that matches the filter.
     * @param {ChatChannelFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const chatChannel = await prisma.chatChannel.findRaw({
     *   filter: { age: { $gt: 25 } }
     * })
     */
    findRaw(args?: ChatChannelFindRawArgs): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a ChatChannel.
     * @param {ChatChannelAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const chatChannel = await prisma.chatChannel.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(args?: ChatChannelAggregateRawArgs): Prisma.PrismaPromise<JsonObject>


    /**
     * Count the number of ChatChannels.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatChannelCountArgs} args - Arguments to filter ChatChannels to count.
     * @example
     * // Count the number of ChatChannels
     * const count = await prisma.chatChannel.count({
     *   where: {
     *     // ... the filter for the ChatChannels we want to count
     *   }
     * })
    **/
    count<T extends ChatChannelCountArgs>(
      args?: Subset<T, ChatChannelCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ChatChannelCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ChatChannel.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatChannelAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ChatChannelAggregateArgs>(args: Subset<T, ChatChannelAggregateArgs>): Prisma.PrismaPromise<GetChatChannelAggregateType<T>>

    /**
     * Group by ChatChannel.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatChannelGroupByArgs} args - Group by arguments.
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
      T extends ChatChannelGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ChatChannelGroupByArgs['orderBy'] }
        : { orderBy?: ChatChannelGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
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
    >(args: SubsetIntersection<T, ChatChannelGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetChatChannelGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ChatChannel model
   */
  readonly fields: ChatChannelFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ChatChannel.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ChatChannelClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ChatChannel model
   */
  interface ChatChannelFieldRefs {
    readonly id: FieldRef<"ChatChannel", 'String'>
    readonly name: FieldRef<"ChatChannel", 'String'>
    readonly description: FieldRef<"ChatChannel", 'String'>
    readonly createdAt: FieldRef<"ChatChannel", 'DateTime'>
    readonly createdBy: FieldRef<"ChatChannel", 'String'>
    readonly isPrivate: FieldRef<"ChatChannel", 'Boolean'>
    readonly members: FieldRef<"ChatChannel", 'String[]'>
    readonly admins: FieldRef<"ChatChannel", 'String[]'>
    readonly metadata: FieldRef<"ChatChannel", 'Json'>
    readonly avatar: FieldRef<"ChatChannel", 'String'>
    readonly lastActive: FieldRef<"ChatChannel", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ChatChannel findUnique
   */
  export type ChatChannelFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatChannel
     */
    select?: ChatChannelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatChannel
     */
    omit?: ChatChannelOmit<ExtArgs> | null
    /**
     * Filter, which ChatChannel to fetch.
     */
    where: ChatChannelWhereUniqueInput
  }

  /**
   * ChatChannel findUniqueOrThrow
   */
  export type ChatChannelFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatChannel
     */
    select?: ChatChannelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatChannel
     */
    omit?: ChatChannelOmit<ExtArgs> | null
    /**
     * Filter, which ChatChannel to fetch.
     */
    where: ChatChannelWhereUniqueInput
  }

  /**
   * ChatChannel findFirst
   */
  export type ChatChannelFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatChannel
     */
    select?: ChatChannelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatChannel
     */
    omit?: ChatChannelOmit<ExtArgs> | null
    /**
     * Filter, which ChatChannel to fetch.
     */
    where?: ChatChannelWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ChatChannels to fetch.
     */
    orderBy?: ChatChannelOrderByWithRelationInput | ChatChannelOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ChatChannels.
     */
    cursor?: ChatChannelWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ChatChannels from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ChatChannels.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ChatChannels.
     */
    distinct?: ChatChannelScalarFieldEnum | ChatChannelScalarFieldEnum[]
  }

  /**
   * ChatChannel findFirstOrThrow
   */
  export type ChatChannelFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatChannel
     */
    select?: ChatChannelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatChannel
     */
    omit?: ChatChannelOmit<ExtArgs> | null
    /**
     * Filter, which ChatChannel to fetch.
     */
    where?: ChatChannelWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ChatChannels to fetch.
     */
    orderBy?: ChatChannelOrderByWithRelationInput | ChatChannelOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ChatChannels.
     */
    cursor?: ChatChannelWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ChatChannels from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ChatChannels.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ChatChannels.
     */
    distinct?: ChatChannelScalarFieldEnum | ChatChannelScalarFieldEnum[]
  }

  /**
   * ChatChannel findMany
   */
  export type ChatChannelFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatChannel
     */
    select?: ChatChannelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatChannel
     */
    omit?: ChatChannelOmit<ExtArgs> | null
    /**
     * Filter, which ChatChannels to fetch.
     */
    where?: ChatChannelWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ChatChannels to fetch.
     */
    orderBy?: ChatChannelOrderByWithRelationInput | ChatChannelOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ChatChannels.
     */
    cursor?: ChatChannelWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ChatChannels from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ChatChannels.
     */
    skip?: number
    distinct?: ChatChannelScalarFieldEnum | ChatChannelScalarFieldEnum[]
  }

  /**
   * ChatChannel create
   */
  export type ChatChannelCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatChannel
     */
    select?: ChatChannelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatChannel
     */
    omit?: ChatChannelOmit<ExtArgs> | null
    /**
     * The data needed to create a ChatChannel.
     */
    data: XOR<ChatChannelCreateInput, ChatChannelUncheckedCreateInput>
  }

  /**
   * ChatChannel createMany
   */
  export type ChatChannelCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ChatChannels.
     */
    data: ChatChannelCreateManyInput | ChatChannelCreateManyInput[]
  }

  /**
   * ChatChannel update
   */
  export type ChatChannelUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatChannel
     */
    select?: ChatChannelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatChannel
     */
    omit?: ChatChannelOmit<ExtArgs> | null
    /**
     * The data needed to update a ChatChannel.
     */
    data: XOR<ChatChannelUpdateInput, ChatChannelUncheckedUpdateInput>
    /**
     * Choose, which ChatChannel to update.
     */
    where: ChatChannelWhereUniqueInput
  }

  /**
   * ChatChannel updateMany
   */
  export type ChatChannelUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ChatChannels.
     */
    data: XOR<ChatChannelUpdateManyMutationInput, ChatChannelUncheckedUpdateManyInput>
    /**
     * Filter which ChatChannels to update
     */
    where?: ChatChannelWhereInput
    /**
     * Limit how many ChatChannels to update.
     */
    limit?: number
  }

  /**
   * ChatChannel upsert
   */
  export type ChatChannelUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatChannel
     */
    select?: ChatChannelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatChannel
     */
    omit?: ChatChannelOmit<ExtArgs> | null
    /**
     * The filter to search for the ChatChannel to update in case it exists.
     */
    where: ChatChannelWhereUniqueInput
    /**
     * In case the ChatChannel found by the `where` argument doesn't exist, create a new ChatChannel with this data.
     */
    create: XOR<ChatChannelCreateInput, ChatChannelUncheckedCreateInput>
    /**
     * In case the ChatChannel was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ChatChannelUpdateInput, ChatChannelUncheckedUpdateInput>
  }

  /**
   * ChatChannel delete
   */
  export type ChatChannelDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatChannel
     */
    select?: ChatChannelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatChannel
     */
    omit?: ChatChannelOmit<ExtArgs> | null
    /**
     * Filter which ChatChannel to delete.
     */
    where: ChatChannelWhereUniqueInput
  }

  /**
   * ChatChannel deleteMany
   */
  export type ChatChannelDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ChatChannels to delete
     */
    where?: ChatChannelWhereInput
    /**
     * Limit how many ChatChannels to delete.
     */
    limit?: number
  }

  /**
   * ChatChannel findRaw
   */
  export type ChatChannelFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * ChatChannel aggregateRaw
   */
  export type ChatChannelAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * ChatChannel without action
   */
  export type ChatChannelDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatChannel
     */
    select?: ChatChannelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatChannel
     */
    omit?: ChatChannelOmit<ExtArgs> | null
  }


  /**
   * Model ChatUser
   */

  export type AggregateChatUser = {
    _count: ChatUserCountAggregateOutputType | null
    _min: ChatUserMinAggregateOutputType | null
    _max: ChatUserMaxAggregateOutputType | null
  }

  export type ChatUserMinAggregateOutputType = {
    id: string | null
    userId: string | null
    name: string | null
    avatar: string | null
    status: string | null
    lastSeen: Date | null
  }

  export type ChatUserMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    name: string | null
    avatar: string | null
    status: string | null
    lastSeen: Date | null
  }

  export type ChatUserCountAggregateOutputType = {
    id: number
    userId: number
    name: number
    avatar: number
    status: number
    lastSeen: number
    channels: number
    preferences: number
    blockedUsers: number
    deviceTokens: number
    _all: number
  }


  export type ChatUserMinAggregateInputType = {
    id?: true
    userId?: true
    name?: true
    avatar?: true
    status?: true
    lastSeen?: true
  }

  export type ChatUserMaxAggregateInputType = {
    id?: true
    userId?: true
    name?: true
    avatar?: true
    status?: true
    lastSeen?: true
  }

  export type ChatUserCountAggregateInputType = {
    id?: true
    userId?: true
    name?: true
    avatar?: true
    status?: true
    lastSeen?: true
    channels?: true
    preferences?: true
    blockedUsers?: true
    deviceTokens?: true
    _all?: true
  }

  export type ChatUserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ChatUser to aggregate.
     */
    where?: ChatUserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ChatUsers to fetch.
     */
    orderBy?: ChatUserOrderByWithRelationInput | ChatUserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ChatUserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ChatUsers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ChatUsers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ChatUsers
    **/
    _count?: true | ChatUserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ChatUserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ChatUserMaxAggregateInputType
  }

  export type GetChatUserAggregateType<T extends ChatUserAggregateArgs> = {
        [P in keyof T & keyof AggregateChatUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateChatUser[P]>
      : GetScalarType<T[P], AggregateChatUser[P]>
  }




  export type ChatUserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ChatUserWhereInput
    orderBy?: ChatUserOrderByWithAggregationInput | ChatUserOrderByWithAggregationInput[]
    by: ChatUserScalarFieldEnum[] | ChatUserScalarFieldEnum
    having?: ChatUserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ChatUserCountAggregateInputType | true
    _min?: ChatUserMinAggregateInputType
    _max?: ChatUserMaxAggregateInputType
  }

  export type ChatUserGroupByOutputType = {
    id: string
    userId: string
    name: string
    avatar: string | null
    status: string
    lastSeen: Date
    channels: string[]
    preferences: JsonValue | null
    blockedUsers: string[]
    deviceTokens: string[]
    _count: ChatUserCountAggregateOutputType | null
    _min: ChatUserMinAggregateOutputType | null
    _max: ChatUserMaxAggregateOutputType | null
  }

  type GetChatUserGroupByPayload<T extends ChatUserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ChatUserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ChatUserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ChatUserGroupByOutputType[P]>
            : GetScalarType<T[P], ChatUserGroupByOutputType[P]>
        }
      >
    >


  export type ChatUserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    name?: boolean
    avatar?: boolean
    status?: boolean
    lastSeen?: boolean
    channels?: boolean
    preferences?: boolean
    blockedUsers?: boolean
    deviceTokens?: boolean
  }, ExtArgs["result"]["chatUser"]>



  export type ChatUserSelectScalar = {
    id?: boolean
    userId?: boolean
    name?: boolean
    avatar?: boolean
    status?: boolean
    lastSeen?: boolean
    channels?: boolean
    preferences?: boolean
    blockedUsers?: boolean
    deviceTokens?: boolean
  }

  export type ChatUserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "name" | "avatar" | "status" | "lastSeen" | "channels" | "preferences" | "blockedUsers" | "deviceTokens", ExtArgs["result"]["chatUser"]>

  export type $ChatUserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ChatUser"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      name: string
      avatar: string | null
      status: string
      lastSeen: Date
      channels: string[]
      preferences: Prisma.JsonValue | null
      blockedUsers: string[]
      deviceTokens: string[]
    }, ExtArgs["result"]["chatUser"]>
    composites: {}
  }

  type ChatUserGetPayload<S extends boolean | null | undefined | ChatUserDefaultArgs> = $Result.GetResult<Prisma.$ChatUserPayload, S>

  type ChatUserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ChatUserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ChatUserCountAggregateInputType | true
    }

  export interface ChatUserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ChatUser'], meta: { name: 'ChatUser' } }
    /**
     * Find zero or one ChatUser that matches the filter.
     * @param {ChatUserFindUniqueArgs} args - Arguments to find a ChatUser
     * @example
     * // Get one ChatUser
     * const chatUser = await prisma.chatUser.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ChatUserFindUniqueArgs>(args: SelectSubset<T, ChatUserFindUniqueArgs<ExtArgs>>): Prisma__ChatUserClient<$Result.GetResult<Prisma.$ChatUserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ChatUser that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ChatUserFindUniqueOrThrowArgs} args - Arguments to find a ChatUser
     * @example
     * // Get one ChatUser
     * const chatUser = await prisma.chatUser.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ChatUserFindUniqueOrThrowArgs>(args: SelectSubset<T, ChatUserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ChatUserClient<$Result.GetResult<Prisma.$ChatUserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ChatUser that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatUserFindFirstArgs} args - Arguments to find a ChatUser
     * @example
     * // Get one ChatUser
     * const chatUser = await prisma.chatUser.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ChatUserFindFirstArgs>(args?: SelectSubset<T, ChatUserFindFirstArgs<ExtArgs>>): Prisma__ChatUserClient<$Result.GetResult<Prisma.$ChatUserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ChatUser that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatUserFindFirstOrThrowArgs} args - Arguments to find a ChatUser
     * @example
     * // Get one ChatUser
     * const chatUser = await prisma.chatUser.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ChatUserFindFirstOrThrowArgs>(args?: SelectSubset<T, ChatUserFindFirstOrThrowArgs<ExtArgs>>): Prisma__ChatUserClient<$Result.GetResult<Prisma.$ChatUserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ChatUsers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatUserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ChatUsers
     * const chatUsers = await prisma.chatUser.findMany()
     * 
     * // Get first 10 ChatUsers
     * const chatUsers = await prisma.chatUser.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const chatUserWithIdOnly = await prisma.chatUser.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ChatUserFindManyArgs>(args?: SelectSubset<T, ChatUserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ChatUserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ChatUser.
     * @param {ChatUserCreateArgs} args - Arguments to create a ChatUser.
     * @example
     * // Create one ChatUser
     * const ChatUser = await prisma.chatUser.create({
     *   data: {
     *     // ... data to create a ChatUser
     *   }
     * })
     * 
     */
    create<T extends ChatUserCreateArgs>(args: SelectSubset<T, ChatUserCreateArgs<ExtArgs>>): Prisma__ChatUserClient<$Result.GetResult<Prisma.$ChatUserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ChatUsers.
     * @param {ChatUserCreateManyArgs} args - Arguments to create many ChatUsers.
     * @example
     * // Create many ChatUsers
     * const chatUser = await prisma.chatUser.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ChatUserCreateManyArgs>(args?: SelectSubset<T, ChatUserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a ChatUser.
     * @param {ChatUserDeleteArgs} args - Arguments to delete one ChatUser.
     * @example
     * // Delete one ChatUser
     * const ChatUser = await prisma.chatUser.delete({
     *   where: {
     *     // ... filter to delete one ChatUser
     *   }
     * })
     * 
     */
    delete<T extends ChatUserDeleteArgs>(args: SelectSubset<T, ChatUserDeleteArgs<ExtArgs>>): Prisma__ChatUserClient<$Result.GetResult<Prisma.$ChatUserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ChatUser.
     * @param {ChatUserUpdateArgs} args - Arguments to update one ChatUser.
     * @example
     * // Update one ChatUser
     * const chatUser = await prisma.chatUser.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ChatUserUpdateArgs>(args: SelectSubset<T, ChatUserUpdateArgs<ExtArgs>>): Prisma__ChatUserClient<$Result.GetResult<Prisma.$ChatUserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ChatUsers.
     * @param {ChatUserDeleteManyArgs} args - Arguments to filter ChatUsers to delete.
     * @example
     * // Delete a few ChatUsers
     * const { count } = await prisma.chatUser.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ChatUserDeleteManyArgs>(args?: SelectSubset<T, ChatUserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ChatUsers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatUserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ChatUsers
     * const chatUser = await prisma.chatUser.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ChatUserUpdateManyArgs>(args: SelectSubset<T, ChatUserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one ChatUser.
     * @param {ChatUserUpsertArgs} args - Arguments to update or create a ChatUser.
     * @example
     * // Update or create a ChatUser
     * const chatUser = await prisma.chatUser.upsert({
     *   create: {
     *     // ... data to create a ChatUser
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ChatUser we want to update
     *   }
     * })
     */
    upsert<T extends ChatUserUpsertArgs>(args: SelectSubset<T, ChatUserUpsertArgs<ExtArgs>>): Prisma__ChatUserClient<$Result.GetResult<Prisma.$ChatUserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ChatUsers that matches the filter.
     * @param {ChatUserFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const chatUser = await prisma.chatUser.findRaw({
     *   filter: { age: { $gt: 25 } }
     * })
     */
    findRaw(args?: ChatUserFindRawArgs): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a ChatUser.
     * @param {ChatUserAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const chatUser = await prisma.chatUser.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(args?: ChatUserAggregateRawArgs): Prisma.PrismaPromise<JsonObject>


    /**
     * Count the number of ChatUsers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatUserCountArgs} args - Arguments to filter ChatUsers to count.
     * @example
     * // Count the number of ChatUsers
     * const count = await prisma.chatUser.count({
     *   where: {
     *     // ... the filter for the ChatUsers we want to count
     *   }
     * })
    **/
    count<T extends ChatUserCountArgs>(
      args?: Subset<T, ChatUserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ChatUserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ChatUser.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatUserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ChatUserAggregateArgs>(args: Subset<T, ChatUserAggregateArgs>): Prisma.PrismaPromise<GetChatUserAggregateType<T>>

    /**
     * Group by ChatUser.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatUserGroupByArgs} args - Group by arguments.
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
      T extends ChatUserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ChatUserGroupByArgs['orderBy'] }
        : { orderBy?: ChatUserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
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
    >(args: SubsetIntersection<T, ChatUserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetChatUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ChatUser model
   */
  readonly fields: ChatUserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ChatUser.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ChatUserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ChatUser model
   */
  interface ChatUserFieldRefs {
    readonly id: FieldRef<"ChatUser", 'String'>
    readonly userId: FieldRef<"ChatUser", 'String'>
    readonly name: FieldRef<"ChatUser", 'String'>
    readonly avatar: FieldRef<"ChatUser", 'String'>
    readonly status: FieldRef<"ChatUser", 'String'>
    readonly lastSeen: FieldRef<"ChatUser", 'DateTime'>
    readonly channels: FieldRef<"ChatUser", 'String[]'>
    readonly preferences: FieldRef<"ChatUser", 'Json'>
    readonly blockedUsers: FieldRef<"ChatUser", 'String[]'>
    readonly deviceTokens: FieldRef<"ChatUser", 'String[]'>
  }
    

  // Custom InputTypes
  /**
   * ChatUser findUnique
   */
  export type ChatUserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatUser
     */
    select?: ChatUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatUser
     */
    omit?: ChatUserOmit<ExtArgs> | null
    /**
     * Filter, which ChatUser to fetch.
     */
    where: ChatUserWhereUniqueInput
  }

  /**
   * ChatUser findUniqueOrThrow
   */
  export type ChatUserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatUser
     */
    select?: ChatUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatUser
     */
    omit?: ChatUserOmit<ExtArgs> | null
    /**
     * Filter, which ChatUser to fetch.
     */
    where: ChatUserWhereUniqueInput
  }

  /**
   * ChatUser findFirst
   */
  export type ChatUserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatUser
     */
    select?: ChatUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatUser
     */
    omit?: ChatUserOmit<ExtArgs> | null
    /**
     * Filter, which ChatUser to fetch.
     */
    where?: ChatUserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ChatUsers to fetch.
     */
    orderBy?: ChatUserOrderByWithRelationInput | ChatUserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ChatUsers.
     */
    cursor?: ChatUserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ChatUsers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ChatUsers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ChatUsers.
     */
    distinct?: ChatUserScalarFieldEnum | ChatUserScalarFieldEnum[]
  }

  /**
   * ChatUser findFirstOrThrow
   */
  export type ChatUserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatUser
     */
    select?: ChatUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatUser
     */
    omit?: ChatUserOmit<ExtArgs> | null
    /**
     * Filter, which ChatUser to fetch.
     */
    where?: ChatUserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ChatUsers to fetch.
     */
    orderBy?: ChatUserOrderByWithRelationInput | ChatUserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ChatUsers.
     */
    cursor?: ChatUserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ChatUsers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ChatUsers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ChatUsers.
     */
    distinct?: ChatUserScalarFieldEnum | ChatUserScalarFieldEnum[]
  }

  /**
   * ChatUser findMany
   */
  export type ChatUserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatUser
     */
    select?: ChatUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatUser
     */
    omit?: ChatUserOmit<ExtArgs> | null
    /**
     * Filter, which ChatUsers to fetch.
     */
    where?: ChatUserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ChatUsers to fetch.
     */
    orderBy?: ChatUserOrderByWithRelationInput | ChatUserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ChatUsers.
     */
    cursor?: ChatUserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ChatUsers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ChatUsers.
     */
    skip?: number
    distinct?: ChatUserScalarFieldEnum | ChatUserScalarFieldEnum[]
  }

  /**
   * ChatUser create
   */
  export type ChatUserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatUser
     */
    select?: ChatUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatUser
     */
    omit?: ChatUserOmit<ExtArgs> | null
    /**
     * The data needed to create a ChatUser.
     */
    data: XOR<ChatUserCreateInput, ChatUserUncheckedCreateInput>
  }

  /**
   * ChatUser createMany
   */
  export type ChatUserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ChatUsers.
     */
    data: ChatUserCreateManyInput | ChatUserCreateManyInput[]
  }

  /**
   * ChatUser update
   */
  export type ChatUserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatUser
     */
    select?: ChatUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatUser
     */
    omit?: ChatUserOmit<ExtArgs> | null
    /**
     * The data needed to update a ChatUser.
     */
    data: XOR<ChatUserUpdateInput, ChatUserUncheckedUpdateInput>
    /**
     * Choose, which ChatUser to update.
     */
    where: ChatUserWhereUniqueInput
  }

  /**
   * ChatUser updateMany
   */
  export type ChatUserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ChatUsers.
     */
    data: XOR<ChatUserUpdateManyMutationInput, ChatUserUncheckedUpdateManyInput>
    /**
     * Filter which ChatUsers to update
     */
    where?: ChatUserWhereInput
    /**
     * Limit how many ChatUsers to update.
     */
    limit?: number
  }

  /**
   * ChatUser upsert
   */
  export type ChatUserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatUser
     */
    select?: ChatUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatUser
     */
    omit?: ChatUserOmit<ExtArgs> | null
    /**
     * The filter to search for the ChatUser to update in case it exists.
     */
    where: ChatUserWhereUniqueInput
    /**
     * In case the ChatUser found by the `where` argument doesn't exist, create a new ChatUser with this data.
     */
    create: XOR<ChatUserCreateInput, ChatUserUncheckedCreateInput>
    /**
     * In case the ChatUser was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ChatUserUpdateInput, ChatUserUncheckedUpdateInput>
  }

  /**
   * ChatUser delete
   */
  export type ChatUserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatUser
     */
    select?: ChatUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatUser
     */
    omit?: ChatUserOmit<ExtArgs> | null
    /**
     * Filter which ChatUser to delete.
     */
    where: ChatUserWhereUniqueInput
  }

  /**
   * ChatUser deleteMany
   */
  export type ChatUserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ChatUsers to delete
     */
    where?: ChatUserWhereInput
    /**
     * Limit how many ChatUsers to delete.
     */
    limit?: number
  }

  /**
   * ChatUser findRaw
   */
  export type ChatUserFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * ChatUser aggregateRaw
   */
  export type ChatUserAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * ChatUser without action
   */
  export type ChatUserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatUser
     */
    select?: ChatUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatUser
     */
    omit?: ChatUserOmit<ExtArgs> | null
  }


  /**
   * Model ChatAttachment
   */

  export type AggregateChatAttachment = {
    _count: ChatAttachmentCountAggregateOutputType | null
    _avg: ChatAttachmentAvgAggregateOutputType | null
    _sum: ChatAttachmentSumAggregateOutputType | null
    _min: ChatAttachmentMinAggregateOutputType | null
    _max: ChatAttachmentMaxAggregateOutputType | null
  }

  export type ChatAttachmentAvgAggregateOutputType = {
    fileSize: number | null
  }

  export type ChatAttachmentSumAggregateOutputType = {
    fileSize: number | null
  }

  export type ChatAttachmentMinAggregateOutputType = {
    id: string | null
    messageId: string | null
    fileName: string | null
    fileType: string | null
    fileSize: number | null
    url: string | null
    thumbnail: string | null
    uploadedAt: Date | null
    uploadedBy: string | null
  }

  export type ChatAttachmentMaxAggregateOutputType = {
    id: string | null
    messageId: string | null
    fileName: string | null
    fileType: string | null
    fileSize: number | null
    url: string | null
    thumbnail: string | null
    uploadedAt: Date | null
    uploadedBy: string | null
  }

  export type ChatAttachmentCountAggregateOutputType = {
    id: number
    messageId: number
    fileName: number
    fileType: number
    fileSize: number
    url: number
    thumbnail: number
    uploadedAt: number
    uploadedBy: number
    metadata: number
    _all: number
  }


  export type ChatAttachmentAvgAggregateInputType = {
    fileSize?: true
  }

  export type ChatAttachmentSumAggregateInputType = {
    fileSize?: true
  }

  export type ChatAttachmentMinAggregateInputType = {
    id?: true
    messageId?: true
    fileName?: true
    fileType?: true
    fileSize?: true
    url?: true
    thumbnail?: true
    uploadedAt?: true
    uploadedBy?: true
  }

  export type ChatAttachmentMaxAggregateInputType = {
    id?: true
    messageId?: true
    fileName?: true
    fileType?: true
    fileSize?: true
    url?: true
    thumbnail?: true
    uploadedAt?: true
    uploadedBy?: true
  }

  export type ChatAttachmentCountAggregateInputType = {
    id?: true
    messageId?: true
    fileName?: true
    fileType?: true
    fileSize?: true
    url?: true
    thumbnail?: true
    uploadedAt?: true
    uploadedBy?: true
    metadata?: true
    _all?: true
  }

  export type ChatAttachmentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ChatAttachment to aggregate.
     */
    where?: ChatAttachmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ChatAttachments to fetch.
     */
    orderBy?: ChatAttachmentOrderByWithRelationInput | ChatAttachmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ChatAttachmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ChatAttachments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ChatAttachments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ChatAttachments
    **/
    _count?: true | ChatAttachmentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ChatAttachmentAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ChatAttachmentSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ChatAttachmentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ChatAttachmentMaxAggregateInputType
  }

  export type GetChatAttachmentAggregateType<T extends ChatAttachmentAggregateArgs> = {
        [P in keyof T & keyof AggregateChatAttachment]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateChatAttachment[P]>
      : GetScalarType<T[P], AggregateChatAttachment[P]>
  }




  export type ChatAttachmentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ChatAttachmentWhereInput
    orderBy?: ChatAttachmentOrderByWithAggregationInput | ChatAttachmentOrderByWithAggregationInput[]
    by: ChatAttachmentScalarFieldEnum[] | ChatAttachmentScalarFieldEnum
    having?: ChatAttachmentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ChatAttachmentCountAggregateInputType | true
    _avg?: ChatAttachmentAvgAggregateInputType
    _sum?: ChatAttachmentSumAggregateInputType
    _min?: ChatAttachmentMinAggregateInputType
    _max?: ChatAttachmentMaxAggregateInputType
  }

  export type ChatAttachmentGroupByOutputType = {
    id: string
    messageId: string
    fileName: string
    fileType: string
    fileSize: number
    url: string
    thumbnail: string | null
    uploadedAt: Date
    uploadedBy: string
    metadata: JsonValue | null
    _count: ChatAttachmentCountAggregateOutputType | null
    _avg: ChatAttachmentAvgAggregateOutputType | null
    _sum: ChatAttachmentSumAggregateOutputType | null
    _min: ChatAttachmentMinAggregateOutputType | null
    _max: ChatAttachmentMaxAggregateOutputType | null
  }

  type GetChatAttachmentGroupByPayload<T extends ChatAttachmentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ChatAttachmentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ChatAttachmentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ChatAttachmentGroupByOutputType[P]>
            : GetScalarType<T[P], ChatAttachmentGroupByOutputType[P]>
        }
      >
    >


  export type ChatAttachmentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    messageId?: boolean
    fileName?: boolean
    fileType?: boolean
    fileSize?: boolean
    url?: boolean
    thumbnail?: boolean
    uploadedAt?: boolean
    uploadedBy?: boolean
    metadata?: boolean
  }, ExtArgs["result"]["chatAttachment"]>



  export type ChatAttachmentSelectScalar = {
    id?: boolean
    messageId?: boolean
    fileName?: boolean
    fileType?: boolean
    fileSize?: boolean
    url?: boolean
    thumbnail?: boolean
    uploadedAt?: boolean
    uploadedBy?: boolean
    metadata?: boolean
  }

  export type ChatAttachmentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "messageId" | "fileName" | "fileType" | "fileSize" | "url" | "thumbnail" | "uploadedAt" | "uploadedBy" | "metadata", ExtArgs["result"]["chatAttachment"]>

  export type $ChatAttachmentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ChatAttachment"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      messageId: string
      fileName: string
      fileType: string
      fileSize: number
      url: string
      thumbnail: string | null
      uploadedAt: Date
      uploadedBy: string
      metadata: Prisma.JsonValue | null
    }, ExtArgs["result"]["chatAttachment"]>
    composites: {}
  }

  type ChatAttachmentGetPayload<S extends boolean | null | undefined | ChatAttachmentDefaultArgs> = $Result.GetResult<Prisma.$ChatAttachmentPayload, S>

  type ChatAttachmentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ChatAttachmentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ChatAttachmentCountAggregateInputType | true
    }

  export interface ChatAttachmentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ChatAttachment'], meta: { name: 'ChatAttachment' } }
    /**
     * Find zero or one ChatAttachment that matches the filter.
     * @param {ChatAttachmentFindUniqueArgs} args - Arguments to find a ChatAttachment
     * @example
     * // Get one ChatAttachment
     * const chatAttachment = await prisma.chatAttachment.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ChatAttachmentFindUniqueArgs>(args: SelectSubset<T, ChatAttachmentFindUniqueArgs<ExtArgs>>): Prisma__ChatAttachmentClient<$Result.GetResult<Prisma.$ChatAttachmentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ChatAttachment that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ChatAttachmentFindUniqueOrThrowArgs} args - Arguments to find a ChatAttachment
     * @example
     * // Get one ChatAttachment
     * const chatAttachment = await prisma.chatAttachment.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ChatAttachmentFindUniqueOrThrowArgs>(args: SelectSubset<T, ChatAttachmentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ChatAttachmentClient<$Result.GetResult<Prisma.$ChatAttachmentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ChatAttachment that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatAttachmentFindFirstArgs} args - Arguments to find a ChatAttachment
     * @example
     * // Get one ChatAttachment
     * const chatAttachment = await prisma.chatAttachment.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ChatAttachmentFindFirstArgs>(args?: SelectSubset<T, ChatAttachmentFindFirstArgs<ExtArgs>>): Prisma__ChatAttachmentClient<$Result.GetResult<Prisma.$ChatAttachmentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ChatAttachment that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatAttachmentFindFirstOrThrowArgs} args - Arguments to find a ChatAttachment
     * @example
     * // Get one ChatAttachment
     * const chatAttachment = await prisma.chatAttachment.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ChatAttachmentFindFirstOrThrowArgs>(args?: SelectSubset<T, ChatAttachmentFindFirstOrThrowArgs<ExtArgs>>): Prisma__ChatAttachmentClient<$Result.GetResult<Prisma.$ChatAttachmentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ChatAttachments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatAttachmentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ChatAttachments
     * const chatAttachments = await prisma.chatAttachment.findMany()
     * 
     * // Get first 10 ChatAttachments
     * const chatAttachments = await prisma.chatAttachment.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const chatAttachmentWithIdOnly = await prisma.chatAttachment.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ChatAttachmentFindManyArgs>(args?: SelectSubset<T, ChatAttachmentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ChatAttachmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ChatAttachment.
     * @param {ChatAttachmentCreateArgs} args - Arguments to create a ChatAttachment.
     * @example
     * // Create one ChatAttachment
     * const ChatAttachment = await prisma.chatAttachment.create({
     *   data: {
     *     // ... data to create a ChatAttachment
     *   }
     * })
     * 
     */
    create<T extends ChatAttachmentCreateArgs>(args: SelectSubset<T, ChatAttachmentCreateArgs<ExtArgs>>): Prisma__ChatAttachmentClient<$Result.GetResult<Prisma.$ChatAttachmentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ChatAttachments.
     * @param {ChatAttachmentCreateManyArgs} args - Arguments to create many ChatAttachments.
     * @example
     * // Create many ChatAttachments
     * const chatAttachment = await prisma.chatAttachment.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ChatAttachmentCreateManyArgs>(args?: SelectSubset<T, ChatAttachmentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a ChatAttachment.
     * @param {ChatAttachmentDeleteArgs} args - Arguments to delete one ChatAttachment.
     * @example
     * // Delete one ChatAttachment
     * const ChatAttachment = await prisma.chatAttachment.delete({
     *   where: {
     *     // ... filter to delete one ChatAttachment
     *   }
     * })
     * 
     */
    delete<T extends ChatAttachmentDeleteArgs>(args: SelectSubset<T, ChatAttachmentDeleteArgs<ExtArgs>>): Prisma__ChatAttachmentClient<$Result.GetResult<Prisma.$ChatAttachmentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ChatAttachment.
     * @param {ChatAttachmentUpdateArgs} args - Arguments to update one ChatAttachment.
     * @example
     * // Update one ChatAttachment
     * const chatAttachment = await prisma.chatAttachment.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ChatAttachmentUpdateArgs>(args: SelectSubset<T, ChatAttachmentUpdateArgs<ExtArgs>>): Prisma__ChatAttachmentClient<$Result.GetResult<Prisma.$ChatAttachmentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ChatAttachments.
     * @param {ChatAttachmentDeleteManyArgs} args - Arguments to filter ChatAttachments to delete.
     * @example
     * // Delete a few ChatAttachments
     * const { count } = await prisma.chatAttachment.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ChatAttachmentDeleteManyArgs>(args?: SelectSubset<T, ChatAttachmentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ChatAttachments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatAttachmentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ChatAttachments
     * const chatAttachment = await prisma.chatAttachment.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ChatAttachmentUpdateManyArgs>(args: SelectSubset<T, ChatAttachmentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one ChatAttachment.
     * @param {ChatAttachmentUpsertArgs} args - Arguments to update or create a ChatAttachment.
     * @example
     * // Update or create a ChatAttachment
     * const chatAttachment = await prisma.chatAttachment.upsert({
     *   create: {
     *     // ... data to create a ChatAttachment
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ChatAttachment we want to update
     *   }
     * })
     */
    upsert<T extends ChatAttachmentUpsertArgs>(args: SelectSubset<T, ChatAttachmentUpsertArgs<ExtArgs>>): Prisma__ChatAttachmentClient<$Result.GetResult<Prisma.$ChatAttachmentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ChatAttachments that matches the filter.
     * @param {ChatAttachmentFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const chatAttachment = await prisma.chatAttachment.findRaw({
     *   filter: { age: { $gt: 25 } }
     * })
     */
    findRaw(args?: ChatAttachmentFindRawArgs): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a ChatAttachment.
     * @param {ChatAttachmentAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const chatAttachment = await prisma.chatAttachment.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(args?: ChatAttachmentAggregateRawArgs): Prisma.PrismaPromise<JsonObject>


    /**
     * Count the number of ChatAttachments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatAttachmentCountArgs} args - Arguments to filter ChatAttachments to count.
     * @example
     * // Count the number of ChatAttachments
     * const count = await prisma.chatAttachment.count({
     *   where: {
     *     // ... the filter for the ChatAttachments we want to count
     *   }
     * })
    **/
    count<T extends ChatAttachmentCountArgs>(
      args?: Subset<T, ChatAttachmentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ChatAttachmentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ChatAttachment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatAttachmentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ChatAttachmentAggregateArgs>(args: Subset<T, ChatAttachmentAggregateArgs>): Prisma.PrismaPromise<GetChatAttachmentAggregateType<T>>

    /**
     * Group by ChatAttachment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatAttachmentGroupByArgs} args - Group by arguments.
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
      T extends ChatAttachmentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ChatAttachmentGroupByArgs['orderBy'] }
        : { orderBy?: ChatAttachmentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
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
    >(args: SubsetIntersection<T, ChatAttachmentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetChatAttachmentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ChatAttachment model
   */
  readonly fields: ChatAttachmentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ChatAttachment.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ChatAttachmentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ChatAttachment model
   */
  interface ChatAttachmentFieldRefs {
    readonly id: FieldRef<"ChatAttachment", 'String'>
    readonly messageId: FieldRef<"ChatAttachment", 'String'>
    readonly fileName: FieldRef<"ChatAttachment", 'String'>
    readonly fileType: FieldRef<"ChatAttachment", 'String'>
    readonly fileSize: FieldRef<"ChatAttachment", 'Int'>
    readonly url: FieldRef<"ChatAttachment", 'String'>
    readonly thumbnail: FieldRef<"ChatAttachment", 'String'>
    readonly uploadedAt: FieldRef<"ChatAttachment", 'DateTime'>
    readonly uploadedBy: FieldRef<"ChatAttachment", 'String'>
    readonly metadata: FieldRef<"ChatAttachment", 'Json'>
  }
    

  // Custom InputTypes
  /**
   * ChatAttachment findUnique
   */
  export type ChatAttachmentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatAttachment
     */
    select?: ChatAttachmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatAttachment
     */
    omit?: ChatAttachmentOmit<ExtArgs> | null
    /**
     * Filter, which ChatAttachment to fetch.
     */
    where: ChatAttachmentWhereUniqueInput
  }

  /**
   * ChatAttachment findUniqueOrThrow
   */
  export type ChatAttachmentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatAttachment
     */
    select?: ChatAttachmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatAttachment
     */
    omit?: ChatAttachmentOmit<ExtArgs> | null
    /**
     * Filter, which ChatAttachment to fetch.
     */
    where: ChatAttachmentWhereUniqueInput
  }

  /**
   * ChatAttachment findFirst
   */
  export type ChatAttachmentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatAttachment
     */
    select?: ChatAttachmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatAttachment
     */
    omit?: ChatAttachmentOmit<ExtArgs> | null
    /**
     * Filter, which ChatAttachment to fetch.
     */
    where?: ChatAttachmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ChatAttachments to fetch.
     */
    orderBy?: ChatAttachmentOrderByWithRelationInput | ChatAttachmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ChatAttachments.
     */
    cursor?: ChatAttachmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ChatAttachments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ChatAttachments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ChatAttachments.
     */
    distinct?: ChatAttachmentScalarFieldEnum | ChatAttachmentScalarFieldEnum[]
  }

  /**
   * ChatAttachment findFirstOrThrow
   */
  export type ChatAttachmentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatAttachment
     */
    select?: ChatAttachmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatAttachment
     */
    omit?: ChatAttachmentOmit<ExtArgs> | null
    /**
     * Filter, which ChatAttachment to fetch.
     */
    where?: ChatAttachmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ChatAttachments to fetch.
     */
    orderBy?: ChatAttachmentOrderByWithRelationInput | ChatAttachmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ChatAttachments.
     */
    cursor?: ChatAttachmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ChatAttachments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ChatAttachments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ChatAttachments.
     */
    distinct?: ChatAttachmentScalarFieldEnum | ChatAttachmentScalarFieldEnum[]
  }

  /**
   * ChatAttachment findMany
   */
  export type ChatAttachmentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatAttachment
     */
    select?: ChatAttachmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatAttachment
     */
    omit?: ChatAttachmentOmit<ExtArgs> | null
    /**
     * Filter, which ChatAttachments to fetch.
     */
    where?: ChatAttachmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ChatAttachments to fetch.
     */
    orderBy?: ChatAttachmentOrderByWithRelationInput | ChatAttachmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ChatAttachments.
     */
    cursor?: ChatAttachmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ChatAttachments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ChatAttachments.
     */
    skip?: number
    distinct?: ChatAttachmentScalarFieldEnum | ChatAttachmentScalarFieldEnum[]
  }

  /**
   * ChatAttachment create
   */
  export type ChatAttachmentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatAttachment
     */
    select?: ChatAttachmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatAttachment
     */
    omit?: ChatAttachmentOmit<ExtArgs> | null
    /**
     * The data needed to create a ChatAttachment.
     */
    data: XOR<ChatAttachmentCreateInput, ChatAttachmentUncheckedCreateInput>
  }

  /**
   * ChatAttachment createMany
   */
  export type ChatAttachmentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ChatAttachments.
     */
    data: ChatAttachmentCreateManyInput | ChatAttachmentCreateManyInput[]
  }

  /**
   * ChatAttachment update
   */
  export type ChatAttachmentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatAttachment
     */
    select?: ChatAttachmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatAttachment
     */
    omit?: ChatAttachmentOmit<ExtArgs> | null
    /**
     * The data needed to update a ChatAttachment.
     */
    data: XOR<ChatAttachmentUpdateInput, ChatAttachmentUncheckedUpdateInput>
    /**
     * Choose, which ChatAttachment to update.
     */
    where: ChatAttachmentWhereUniqueInput
  }

  /**
   * ChatAttachment updateMany
   */
  export type ChatAttachmentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ChatAttachments.
     */
    data: XOR<ChatAttachmentUpdateManyMutationInput, ChatAttachmentUncheckedUpdateManyInput>
    /**
     * Filter which ChatAttachments to update
     */
    where?: ChatAttachmentWhereInput
    /**
     * Limit how many ChatAttachments to update.
     */
    limit?: number
  }

  /**
   * ChatAttachment upsert
   */
  export type ChatAttachmentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatAttachment
     */
    select?: ChatAttachmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatAttachment
     */
    omit?: ChatAttachmentOmit<ExtArgs> | null
    /**
     * The filter to search for the ChatAttachment to update in case it exists.
     */
    where: ChatAttachmentWhereUniqueInput
    /**
     * In case the ChatAttachment found by the `where` argument doesn't exist, create a new ChatAttachment with this data.
     */
    create: XOR<ChatAttachmentCreateInput, ChatAttachmentUncheckedCreateInput>
    /**
     * In case the ChatAttachment was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ChatAttachmentUpdateInput, ChatAttachmentUncheckedUpdateInput>
  }

  /**
   * ChatAttachment delete
   */
  export type ChatAttachmentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatAttachment
     */
    select?: ChatAttachmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatAttachment
     */
    omit?: ChatAttachmentOmit<ExtArgs> | null
    /**
     * Filter which ChatAttachment to delete.
     */
    where: ChatAttachmentWhereUniqueInput
  }

  /**
   * ChatAttachment deleteMany
   */
  export type ChatAttachmentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ChatAttachments to delete
     */
    where?: ChatAttachmentWhereInput
    /**
     * Limit how many ChatAttachments to delete.
     */
    limit?: number
  }

  /**
   * ChatAttachment findRaw
   */
  export type ChatAttachmentFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * ChatAttachment aggregateRaw
   */
  export type ChatAttachmentAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * ChatAttachment without action
   */
  export type ChatAttachmentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatAttachment
     */
    select?: ChatAttachmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatAttachment
     */
    omit?: ChatAttachmentOmit<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const ChatMessageScalarFieldEnum: {
    id: 'id',
    senderId: 'senderId',
    senderName: 'senderName',
    content: 'content',
    recipientId: 'recipientId',
    channelName: 'channelName',
    recipientName: 'recipientName',
    recipientAvatar: 'recipientAvatar',
    timestamp: 'timestamp',
    status: 'status',
    type: 'type',
    sentiment: 'sentiment',
    translation: 'translation',
    aiGenerated: 'aiGenerated',
    contextData: 'contextData',
    effect: 'effect',
    priority: 'priority',
    reactions: 'reactions',
    bookmarked: 'bookmarked',
    spatial: 'spatial',
    metadata: 'metadata',
    attachments: 'attachments',
    threadId: 'threadId',
    edited: 'edited',
    editHistory: 'editHistory',
    mentions: 'mentions',
    tags: 'tags',
    readBy: 'readBy',
    expiresAt: 'expiresAt'
  };

  export type ChatMessageScalarFieldEnum = (typeof ChatMessageScalarFieldEnum)[keyof typeof ChatMessageScalarFieldEnum]


  export const ChatChannelScalarFieldEnum: {
    id: 'id',
    name: 'name',
    description: 'description',
    createdAt: 'createdAt',
    createdBy: 'createdBy',
    isPrivate: 'isPrivate',
    members: 'members',
    admins: 'admins',
    metadata: 'metadata',
    avatar: 'avatar',
    lastActive: 'lastActive'
  };

  export type ChatChannelScalarFieldEnum = (typeof ChatChannelScalarFieldEnum)[keyof typeof ChatChannelScalarFieldEnum]


  export const ChatUserScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    name: 'name',
    avatar: 'avatar',
    status: 'status',
    lastSeen: 'lastSeen',
    channels: 'channels',
    preferences: 'preferences',
    blockedUsers: 'blockedUsers',
    deviceTokens: 'deviceTokens'
  };

  export type ChatUserScalarFieldEnum = (typeof ChatUserScalarFieldEnum)[keyof typeof ChatUserScalarFieldEnum]


  export const ChatAttachmentScalarFieldEnum: {
    id: 'id',
    messageId: 'messageId',
    fileName: 'fileName',
    fileType: 'fileType',
    fileSize: 'fileSize',
    url: 'url',
    thumbnail: 'thumbnail',
    uploadedAt: 'uploadedAt',
    uploadedBy: 'uploadedBy',
    metadata: 'metadata'
  };

  export type ChatAttachmentScalarFieldEnum = (typeof ChatAttachmentScalarFieldEnum)[keyof typeof ChatAttachmentScalarFieldEnum]


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
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type ChatMessageWhereInput = {
    AND?: ChatMessageWhereInput | ChatMessageWhereInput[]
    OR?: ChatMessageWhereInput[]
    NOT?: ChatMessageWhereInput | ChatMessageWhereInput[]
    id?: StringFilter<"ChatMessage"> | string
    senderId?: StringFilter<"ChatMessage"> | string
    senderName?: StringFilter<"ChatMessage"> | string
    content?: StringFilter<"ChatMessage"> | string
    recipientId?: StringNullableFilter<"ChatMessage"> | string | null
    channelName?: StringFilter<"ChatMessage"> | string
    recipientName?: StringNullableFilter<"ChatMessage"> | string | null
    recipientAvatar?: StringNullableFilter<"ChatMessage"> | string | null
    timestamp?: DateTimeFilter<"ChatMessage"> | Date | string
    status?: StringFilter<"ChatMessage"> | string
    type?: StringFilter<"ChatMessage"> | string
    sentiment?: StringNullableFilter<"ChatMessage"> | string | null
    translation?: JsonNullableFilter<"ChatMessage">
    aiGenerated?: BoolFilter<"ChatMessage"> | boolean
    contextData?: JsonNullableFilter<"ChatMessage">
    effect?: StringNullableFilter<"ChatMessage"> | string | null
    priority?: StringFilter<"ChatMessage"> | string
    reactions?: JsonNullableFilter<"ChatMessage">
    bookmarked?: BoolFilter<"ChatMessage"> | boolean
    spatial?: JsonNullableFilter<"ChatMessage">
    metadata?: JsonNullableFilter<"ChatMessage">
    attachments?: JsonNullableFilter<"ChatMessage">
    threadId?: StringNullableFilter<"ChatMessage"> | string | null
    edited?: BoolFilter<"ChatMessage"> | boolean
    editHistory?: JsonNullableFilter<"ChatMessage">
    mentions?: JsonNullableFilter<"ChatMessage">
    tags?: StringNullableListFilter<"ChatMessage">
    readBy?: StringNullableListFilter<"ChatMessage">
    expiresAt?: DateTimeNullableFilter<"ChatMessage"> | Date | string | null
  }

  export type ChatMessageOrderByWithRelationInput = {
    id?: SortOrder
    senderId?: SortOrder
    senderName?: SortOrder
    content?: SortOrder
    recipientId?: SortOrder
    channelName?: SortOrder
    recipientName?: SortOrder
    recipientAvatar?: SortOrder
    timestamp?: SortOrder
    status?: SortOrder
    type?: SortOrder
    sentiment?: SortOrder
    translation?: SortOrder
    aiGenerated?: SortOrder
    contextData?: SortOrder
    effect?: SortOrder
    priority?: SortOrder
    reactions?: SortOrder
    bookmarked?: SortOrder
    spatial?: SortOrder
    metadata?: SortOrder
    attachments?: SortOrder
    threadId?: SortOrder
    edited?: SortOrder
    editHistory?: SortOrder
    mentions?: SortOrder
    tags?: SortOrder
    readBy?: SortOrder
    expiresAt?: SortOrder
  }

  export type ChatMessageWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ChatMessageWhereInput | ChatMessageWhereInput[]
    OR?: ChatMessageWhereInput[]
    NOT?: ChatMessageWhereInput | ChatMessageWhereInput[]
    senderId?: StringFilter<"ChatMessage"> | string
    senderName?: StringFilter<"ChatMessage"> | string
    content?: StringFilter<"ChatMessage"> | string
    recipientId?: StringNullableFilter<"ChatMessage"> | string | null
    channelName?: StringFilter<"ChatMessage"> | string
    recipientName?: StringNullableFilter<"ChatMessage"> | string | null
    recipientAvatar?: StringNullableFilter<"ChatMessage"> | string | null
    timestamp?: DateTimeFilter<"ChatMessage"> | Date | string
    status?: StringFilter<"ChatMessage"> | string
    type?: StringFilter<"ChatMessage"> | string
    sentiment?: StringNullableFilter<"ChatMessage"> | string | null
    translation?: JsonNullableFilter<"ChatMessage">
    aiGenerated?: BoolFilter<"ChatMessage"> | boolean
    contextData?: JsonNullableFilter<"ChatMessage">
    effect?: StringNullableFilter<"ChatMessage"> | string | null
    priority?: StringFilter<"ChatMessage"> | string
    reactions?: JsonNullableFilter<"ChatMessage">
    bookmarked?: BoolFilter<"ChatMessage"> | boolean
    spatial?: JsonNullableFilter<"ChatMessage">
    metadata?: JsonNullableFilter<"ChatMessage">
    attachments?: JsonNullableFilter<"ChatMessage">
    threadId?: StringNullableFilter<"ChatMessage"> | string | null
    edited?: BoolFilter<"ChatMessage"> | boolean
    editHistory?: JsonNullableFilter<"ChatMessage">
    mentions?: JsonNullableFilter<"ChatMessage">
    tags?: StringNullableListFilter<"ChatMessage">
    readBy?: StringNullableListFilter<"ChatMessage">
    expiresAt?: DateTimeNullableFilter<"ChatMessage"> | Date | string | null
  }, "id">

  export type ChatMessageOrderByWithAggregationInput = {
    id?: SortOrder
    senderId?: SortOrder
    senderName?: SortOrder
    content?: SortOrder
    recipientId?: SortOrder
    channelName?: SortOrder
    recipientName?: SortOrder
    recipientAvatar?: SortOrder
    timestamp?: SortOrder
    status?: SortOrder
    type?: SortOrder
    sentiment?: SortOrder
    translation?: SortOrder
    aiGenerated?: SortOrder
    contextData?: SortOrder
    effect?: SortOrder
    priority?: SortOrder
    reactions?: SortOrder
    bookmarked?: SortOrder
    spatial?: SortOrder
    metadata?: SortOrder
    attachments?: SortOrder
    threadId?: SortOrder
    edited?: SortOrder
    editHistory?: SortOrder
    mentions?: SortOrder
    tags?: SortOrder
    readBy?: SortOrder
    expiresAt?: SortOrder
    _count?: ChatMessageCountOrderByAggregateInput
    _max?: ChatMessageMaxOrderByAggregateInput
    _min?: ChatMessageMinOrderByAggregateInput
  }

  export type ChatMessageScalarWhereWithAggregatesInput = {
    AND?: ChatMessageScalarWhereWithAggregatesInput | ChatMessageScalarWhereWithAggregatesInput[]
    OR?: ChatMessageScalarWhereWithAggregatesInput[]
    NOT?: ChatMessageScalarWhereWithAggregatesInput | ChatMessageScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ChatMessage"> | string
    senderId?: StringWithAggregatesFilter<"ChatMessage"> | string
    senderName?: StringWithAggregatesFilter<"ChatMessage"> | string
    content?: StringWithAggregatesFilter<"ChatMessage"> | string
    recipientId?: StringNullableWithAggregatesFilter<"ChatMessage"> | string | null
    channelName?: StringWithAggregatesFilter<"ChatMessage"> | string
    recipientName?: StringNullableWithAggregatesFilter<"ChatMessage"> | string | null
    recipientAvatar?: StringNullableWithAggregatesFilter<"ChatMessage"> | string | null
    timestamp?: DateTimeWithAggregatesFilter<"ChatMessage"> | Date | string
    status?: StringWithAggregatesFilter<"ChatMessage"> | string
    type?: StringWithAggregatesFilter<"ChatMessage"> | string
    sentiment?: StringNullableWithAggregatesFilter<"ChatMessage"> | string | null
    translation?: JsonNullableWithAggregatesFilter<"ChatMessage">
    aiGenerated?: BoolWithAggregatesFilter<"ChatMessage"> | boolean
    contextData?: JsonNullableWithAggregatesFilter<"ChatMessage">
    effect?: StringNullableWithAggregatesFilter<"ChatMessage"> | string | null
    priority?: StringWithAggregatesFilter<"ChatMessage"> | string
    reactions?: JsonNullableWithAggregatesFilter<"ChatMessage">
    bookmarked?: BoolWithAggregatesFilter<"ChatMessage"> | boolean
    spatial?: JsonNullableWithAggregatesFilter<"ChatMessage">
    metadata?: JsonNullableWithAggregatesFilter<"ChatMessage">
    attachments?: JsonNullableWithAggregatesFilter<"ChatMessage">
    threadId?: StringNullableWithAggregatesFilter<"ChatMessage"> | string | null
    edited?: BoolWithAggregatesFilter<"ChatMessage"> | boolean
    editHistory?: JsonNullableWithAggregatesFilter<"ChatMessage">
    mentions?: JsonNullableWithAggregatesFilter<"ChatMessage">
    tags?: StringNullableListFilter<"ChatMessage">
    readBy?: StringNullableListFilter<"ChatMessage">
    expiresAt?: DateTimeNullableWithAggregatesFilter<"ChatMessage"> | Date | string | null
  }

  export type ChatChannelWhereInput = {
    AND?: ChatChannelWhereInput | ChatChannelWhereInput[]
    OR?: ChatChannelWhereInput[]
    NOT?: ChatChannelWhereInput | ChatChannelWhereInput[]
    id?: StringFilter<"ChatChannel"> | string
    name?: StringFilter<"ChatChannel"> | string
    description?: StringNullableFilter<"ChatChannel"> | string | null
    createdAt?: DateTimeFilter<"ChatChannel"> | Date | string
    createdBy?: StringFilter<"ChatChannel"> | string
    isPrivate?: BoolFilter<"ChatChannel"> | boolean
    members?: StringNullableListFilter<"ChatChannel">
    admins?: StringNullableListFilter<"ChatChannel">
    metadata?: JsonNullableFilter<"ChatChannel">
    avatar?: StringNullableFilter<"ChatChannel"> | string | null
    lastActive?: DateTimeFilter<"ChatChannel"> | Date | string
  }

  export type ChatChannelOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
    createdBy?: SortOrder
    isPrivate?: SortOrder
    members?: SortOrder
    admins?: SortOrder
    metadata?: SortOrder
    avatar?: SortOrder
    lastActive?: SortOrder
  }

  export type ChatChannelWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    name?: string
    AND?: ChatChannelWhereInput | ChatChannelWhereInput[]
    OR?: ChatChannelWhereInput[]
    NOT?: ChatChannelWhereInput | ChatChannelWhereInput[]
    description?: StringNullableFilter<"ChatChannel"> | string | null
    createdAt?: DateTimeFilter<"ChatChannel"> | Date | string
    createdBy?: StringFilter<"ChatChannel"> | string
    isPrivate?: BoolFilter<"ChatChannel"> | boolean
    members?: StringNullableListFilter<"ChatChannel">
    admins?: StringNullableListFilter<"ChatChannel">
    metadata?: JsonNullableFilter<"ChatChannel">
    avatar?: StringNullableFilter<"ChatChannel"> | string | null
    lastActive?: DateTimeFilter<"ChatChannel"> | Date | string
  }, "id" | "name">

  export type ChatChannelOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
    createdBy?: SortOrder
    isPrivate?: SortOrder
    members?: SortOrder
    admins?: SortOrder
    metadata?: SortOrder
    avatar?: SortOrder
    lastActive?: SortOrder
    _count?: ChatChannelCountOrderByAggregateInput
    _max?: ChatChannelMaxOrderByAggregateInput
    _min?: ChatChannelMinOrderByAggregateInput
  }

  export type ChatChannelScalarWhereWithAggregatesInput = {
    AND?: ChatChannelScalarWhereWithAggregatesInput | ChatChannelScalarWhereWithAggregatesInput[]
    OR?: ChatChannelScalarWhereWithAggregatesInput[]
    NOT?: ChatChannelScalarWhereWithAggregatesInput | ChatChannelScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ChatChannel"> | string
    name?: StringWithAggregatesFilter<"ChatChannel"> | string
    description?: StringNullableWithAggregatesFilter<"ChatChannel"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"ChatChannel"> | Date | string
    createdBy?: StringWithAggregatesFilter<"ChatChannel"> | string
    isPrivate?: BoolWithAggregatesFilter<"ChatChannel"> | boolean
    members?: StringNullableListFilter<"ChatChannel">
    admins?: StringNullableListFilter<"ChatChannel">
    metadata?: JsonNullableWithAggregatesFilter<"ChatChannel">
    avatar?: StringNullableWithAggregatesFilter<"ChatChannel"> | string | null
    lastActive?: DateTimeWithAggregatesFilter<"ChatChannel"> | Date | string
  }

  export type ChatUserWhereInput = {
    AND?: ChatUserWhereInput | ChatUserWhereInput[]
    OR?: ChatUserWhereInput[]
    NOT?: ChatUserWhereInput | ChatUserWhereInput[]
    id?: StringFilter<"ChatUser"> | string
    userId?: StringFilter<"ChatUser"> | string
    name?: StringFilter<"ChatUser"> | string
    avatar?: StringNullableFilter<"ChatUser"> | string | null
    status?: StringFilter<"ChatUser"> | string
    lastSeen?: DateTimeFilter<"ChatUser"> | Date | string
    channels?: StringNullableListFilter<"ChatUser">
    preferences?: JsonNullableFilter<"ChatUser">
    blockedUsers?: StringNullableListFilter<"ChatUser">
    deviceTokens?: StringNullableListFilter<"ChatUser">
  }

  export type ChatUserOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    avatar?: SortOrder
    status?: SortOrder
    lastSeen?: SortOrder
    channels?: SortOrder
    preferences?: SortOrder
    blockedUsers?: SortOrder
    deviceTokens?: SortOrder
  }

  export type ChatUserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId?: string
    AND?: ChatUserWhereInput | ChatUserWhereInput[]
    OR?: ChatUserWhereInput[]
    NOT?: ChatUserWhereInput | ChatUserWhereInput[]
    name?: StringFilter<"ChatUser"> | string
    avatar?: StringNullableFilter<"ChatUser"> | string | null
    status?: StringFilter<"ChatUser"> | string
    lastSeen?: DateTimeFilter<"ChatUser"> | Date | string
    channels?: StringNullableListFilter<"ChatUser">
    preferences?: JsonNullableFilter<"ChatUser">
    blockedUsers?: StringNullableListFilter<"ChatUser">
    deviceTokens?: StringNullableListFilter<"ChatUser">
  }, "id" | "userId">

  export type ChatUserOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    avatar?: SortOrder
    status?: SortOrder
    lastSeen?: SortOrder
    channels?: SortOrder
    preferences?: SortOrder
    blockedUsers?: SortOrder
    deviceTokens?: SortOrder
    _count?: ChatUserCountOrderByAggregateInput
    _max?: ChatUserMaxOrderByAggregateInput
    _min?: ChatUserMinOrderByAggregateInput
  }

  export type ChatUserScalarWhereWithAggregatesInput = {
    AND?: ChatUserScalarWhereWithAggregatesInput | ChatUserScalarWhereWithAggregatesInput[]
    OR?: ChatUserScalarWhereWithAggregatesInput[]
    NOT?: ChatUserScalarWhereWithAggregatesInput | ChatUserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ChatUser"> | string
    userId?: StringWithAggregatesFilter<"ChatUser"> | string
    name?: StringWithAggregatesFilter<"ChatUser"> | string
    avatar?: StringNullableWithAggregatesFilter<"ChatUser"> | string | null
    status?: StringWithAggregatesFilter<"ChatUser"> | string
    lastSeen?: DateTimeWithAggregatesFilter<"ChatUser"> | Date | string
    channels?: StringNullableListFilter<"ChatUser">
    preferences?: JsonNullableWithAggregatesFilter<"ChatUser">
    blockedUsers?: StringNullableListFilter<"ChatUser">
    deviceTokens?: StringNullableListFilter<"ChatUser">
  }

  export type ChatAttachmentWhereInput = {
    AND?: ChatAttachmentWhereInput | ChatAttachmentWhereInput[]
    OR?: ChatAttachmentWhereInput[]
    NOT?: ChatAttachmentWhereInput | ChatAttachmentWhereInput[]
    id?: StringFilter<"ChatAttachment"> | string
    messageId?: StringFilter<"ChatAttachment"> | string
    fileName?: StringFilter<"ChatAttachment"> | string
    fileType?: StringFilter<"ChatAttachment"> | string
    fileSize?: IntFilter<"ChatAttachment"> | number
    url?: StringFilter<"ChatAttachment"> | string
    thumbnail?: StringNullableFilter<"ChatAttachment"> | string | null
    uploadedAt?: DateTimeFilter<"ChatAttachment"> | Date | string
    uploadedBy?: StringFilter<"ChatAttachment"> | string
    metadata?: JsonNullableFilter<"ChatAttachment">
  }

  export type ChatAttachmentOrderByWithRelationInput = {
    id?: SortOrder
    messageId?: SortOrder
    fileName?: SortOrder
    fileType?: SortOrder
    fileSize?: SortOrder
    url?: SortOrder
    thumbnail?: SortOrder
    uploadedAt?: SortOrder
    uploadedBy?: SortOrder
    metadata?: SortOrder
  }

  export type ChatAttachmentWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ChatAttachmentWhereInput | ChatAttachmentWhereInput[]
    OR?: ChatAttachmentWhereInput[]
    NOT?: ChatAttachmentWhereInput | ChatAttachmentWhereInput[]
    messageId?: StringFilter<"ChatAttachment"> | string
    fileName?: StringFilter<"ChatAttachment"> | string
    fileType?: StringFilter<"ChatAttachment"> | string
    fileSize?: IntFilter<"ChatAttachment"> | number
    url?: StringFilter<"ChatAttachment"> | string
    thumbnail?: StringNullableFilter<"ChatAttachment"> | string | null
    uploadedAt?: DateTimeFilter<"ChatAttachment"> | Date | string
    uploadedBy?: StringFilter<"ChatAttachment"> | string
    metadata?: JsonNullableFilter<"ChatAttachment">
  }, "id">

  export type ChatAttachmentOrderByWithAggregationInput = {
    id?: SortOrder
    messageId?: SortOrder
    fileName?: SortOrder
    fileType?: SortOrder
    fileSize?: SortOrder
    url?: SortOrder
    thumbnail?: SortOrder
    uploadedAt?: SortOrder
    uploadedBy?: SortOrder
    metadata?: SortOrder
    _count?: ChatAttachmentCountOrderByAggregateInput
    _avg?: ChatAttachmentAvgOrderByAggregateInput
    _max?: ChatAttachmentMaxOrderByAggregateInput
    _min?: ChatAttachmentMinOrderByAggregateInput
    _sum?: ChatAttachmentSumOrderByAggregateInput
  }

  export type ChatAttachmentScalarWhereWithAggregatesInput = {
    AND?: ChatAttachmentScalarWhereWithAggregatesInput | ChatAttachmentScalarWhereWithAggregatesInput[]
    OR?: ChatAttachmentScalarWhereWithAggregatesInput[]
    NOT?: ChatAttachmentScalarWhereWithAggregatesInput | ChatAttachmentScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ChatAttachment"> | string
    messageId?: StringWithAggregatesFilter<"ChatAttachment"> | string
    fileName?: StringWithAggregatesFilter<"ChatAttachment"> | string
    fileType?: StringWithAggregatesFilter<"ChatAttachment"> | string
    fileSize?: IntWithAggregatesFilter<"ChatAttachment"> | number
    url?: StringWithAggregatesFilter<"ChatAttachment"> | string
    thumbnail?: StringNullableWithAggregatesFilter<"ChatAttachment"> | string | null
    uploadedAt?: DateTimeWithAggregatesFilter<"ChatAttachment"> | Date | string
    uploadedBy?: StringWithAggregatesFilter<"ChatAttachment"> | string
    metadata?: JsonNullableWithAggregatesFilter<"ChatAttachment">
  }

  export type ChatMessageCreateInput = {
    id?: string
    senderId: string
    senderName: string
    content: string
    recipientId?: string | null
    channelName: string
    recipientName?: string | null
    recipientAvatar?: string | null
    timestamp?: Date | string
    status?: string
    type?: string
    sentiment?: string | null
    translation?: InputJsonValue | null
    aiGenerated?: boolean
    contextData?: InputJsonValue | null
    effect?: string | null
    priority?: string
    reactions?: InputJsonValue | null
    bookmarked?: boolean
    spatial?: InputJsonValue | null
    metadata?: InputJsonValue | null
    attachments?: InputJsonValue | null
    threadId?: string | null
    edited?: boolean
    editHistory?: InputJsonValue | null
    mentions?: InputJsonValue | null
    tags?: ChatMessageCreatetagsInput | string[]
    readBy?: ChatMessageCreatereadByInput | string[]
    expiresAt?: Date | string | null
  }

  export type ChatMessageUncheckedCreateInput = {
    id?: string
    senderId: string
    senderName: string
    content: string
    recipientId?: string | null
    channelName: string
    recipientName?: string | null
    recipientAvatar?: string | null
    timestamp?: Date | string
    status?: string
    type?: string
    sentiment?: string | null
    translation?: InputJsonValue | null
    aiGenerated?: boolean
    contextData?: InputJsonValue | null
    effect?: string | null
    priority?: string
    reactions?: InputJsonValue | null
    bookmarked?: boolean
    spatial?: InputJsonValue | null
    metadata?: InputJsonValue | null
    attachments?: InputJsonValue | null
    threadId?: string | null
    edited?: boolean
    editHistory?: InputJsonValue | null
    mentions?: InputJsonValue | null
    tags?: ChatMessageCreatetagsInput | string[]
    readBy?: ChatMessageCreatereadByInput | string[]
    expiresAt?: Date | string | null
  }

  export type ChatMessageUpdateInput = {
    senderId?: StringFieldUpdateOperationsInput | string
    senderName?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    recipientId?: NullableStringFieldUpdateOperationsInput | string | null
    channelName?: StringFieldUpdateOperationsInput | string
    recipientName?: NullableStringFieldUpdateOperationsInput | string | null
    recipientAvatar?: NullableStringFieldUpdateOperationsInput | string | null
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    sentiment?: NullableStringFieldUpdateOperationsInput | string | null
    translation?: InputJsonValue | InputJsonValue | null
    aiGenerated?: BoolFieldUpdateOperationsInput | boolean
    contextData?: InputJsonValue | InputJsonValue | null
    effect?: NullableStringFieldUpdateOperationsInput | string | null
    priority?: StringFieldUpdateOperationsInput | string
    reactions?: InputJsonValue | InputJsonValue | null
    bookmarked?: BoolFieldUpdateOperationsInput | boolean
    spatial?: InputJsonValue | InputJsonValue | null
    metadata?: InputJsonValue | InputJsonValue | null
    attachments?: InputJsonValue | InputJsonValue | null
    threadId?: NullableStringFieldUpdateOperationsInput | string | null
    edited?: BoolFieldUpdateOperationsInput | boolean
    editHistory?: InputJsonValue | InputJsonValue | null
    mentions?: InputJsonValue | InputJsonValue | null
    tags?: ChatMessageUpdatetagsInput | string[]
    readBy?: ChatMessageUpdatereadByInput | string[]
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ChatMessageUncheckedUpdateInput = {
    senderId?: StringFieldUpdateOperationsInput | string
    senderName?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    recipientId?: NullableStringFieldUpdateOperationsInput | string | null
    channelName?: StringFieldUpdateOperationsInput | string
    recipientName?: NullableStringFieldUpdateOperationsInput | string | null
    recipientAvatar?: NullableStringFieldUpdateOperationsInput | string | null
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    sentiment?: NullableStringFieldUpdateOperationsInput | string | null
    translation?: InputJsonValue | InputJsonValue | null
    aiGenerated?: BoolFieldUpdateOperationsInput | boolean
    contextData?: InputJsonValue | InputJsonValue | null
    effect?: NullableStringFieldUpdateOperationsInput | string | null
    priority?: StringFieldUpdateOperationsInput | string
    reactions?: InputJsonValue | InputJsonValue | null
    bookmarked?: BoolFieldUpdateOperationsInput | boolean
    spatial?: InputJsonValue | InputJsonValue | null
    metadata?: InputJsonValue | InputJsonValue | null
    attachments?: InputJsonValue | InputJsonValue | null
    threadId?: NullableStringFieldUpdateOperationsInput | string | null
    edited?: BoolFieldUpdateOperationsInput | boolean
    editHistory?: InputJsonValue | InputJsonValue | null
    mentions?: InputJsonValue | InputJsonValue | null
    tags?: ChatMessageUpdatetagsInput | string[]
    readBy?: ChatMessageUpdatereadByInput | string[]
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ChatMessageCreateManyInput = {
    id?: string
    senderId: string
    senderName: string
    content: string
    recipientId?: string | null
    channelName: string
    recipientName?: string | null
    recipientAvatar?: string | null
    timestamp?: Date | string
    status?: string
    type?: string
    sentiment?: string | null
    translation?: InputJsonValue | null
    aiGenerated?: boolean
    contextData?: InputJsonValue | null
    effect?: string | null
    priority?: string
    reactions?: InputJsonValue | null
    bookmarked?: boolean
    spatial?: InputJsonValue | null
    metadata?: InputJsonValue | null
    attachments?: InputJsonValue | null
    threadId?: string | null
    edited?: boolean
    editHistory?: InputJsonValue | null
    mentions?: InputJsonValue | null
    tags?: ChatMessageCreatetagsInput | string[]
    readBy?: ChatMessageCreatereadByInput | string[]
    expiresAt?: Date | string | null
  }

  export type ChatMessageUpdateManyMutationInput = {
    senderId?: StringFieldUpdateOperationsInput | string
    senderName?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    recipientId?: NullableStringFieldUpdateOperationsInput | string | null
    channelName?: StringFieldUpdateOperationsInput | string
    recipientName?: NullableStringFieldUpdateOperationsInput | string | null
    recipientAvatar?: NullableStringFieldUpdateOperationsInput | string | null
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    sentiment?: NullableStringFieldUpdateOperationsInput | string | null
    translation?: InputJsonValue | InputJsonValue | null
    aiGenerated?: BoolFieldUpdateOperationsInput | boolean
    contextData?: InputJsonValue | InputJsonValue | null
    effect?: NullableStringFieldUpdateOperationsInput | string | null
    priority?: StringFieldUpdateOperationsInput | string
    reactions?: InputJsonValue | InputJsonValue | null
    bookmarked?: BoolFieldUpdateOperationsInput | boolean
    spatial?: InputJsonValue | InputJsonValue | null
    metadata?: InputJsonValue | InputJsonValue | null
    attachments?: InputJsonValue | InputJsonValue | null
    threadId?: NullableStringFieldUpdateOperationsInput | string | null
    edited?: BoolFieldUpdateOperationsInput | boolean
    editHistory?: InputJsonValue | InputJsonValue | null
    mentions?: InputJsonValue | InputJsonValue | null
    tags?: ChatMessageUpdatetagsInput | string[]
    readBy?: ChatMessageUpdatereadByInput | string[]
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ChatMessageUncheckedUpdateManyInput = {
    senderId?: StringFieldUpdateOperationsInput | string
    senderName?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    recipientId?: NullableStringFieldUpdateOperationsInput | string | null
    channelName?: StringFieldUpdateOperationsInput | string
    recipientName?: NullableStringFieldUpdateOperationsInput | string | null
    recipientAvatar?: NullableStringFieldUpdateOperationsInput | string | null
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    sentiment?: NullableStringFieldUpdateOperationsInput | string | null
    translation?: InputJsonValue | InputJsonValue | null
    aiGenerated?: BoolFieldUpdateOperationsInput | boolean
    contextData?: InputJsonValue | InputJsonValue | null
    effect?: NullableStringFieldUpdateOperationsInput | string | null
    priority?: StringFieldUpdateOperationsInput | string
    reactions?: InputJsonValue | InputJsonValue | null
    bookmarked?: BoolFieldUpdateOperationsInput | boolean
    spatial?: InputJsonValue | InputJsonValue | null
    metadata?: InputJsonValue | InputJsonValue | null
    attachments?: InputJsonValue | InputJsonValue | null
    threadId?: NullableStringFieldUpdateOperationsInput | string | null
    edited?: BoolFieldUpdateOperationsInput | boolean
    editHistory?: InputJsonValue | InputJsonValue | null
    mentions?: InputJsonValue | InputJsonValue | null
    tags?: ChatMessageUpdatetagsInput | string[]
    readBy?: ChatMessageUpdatereadByInput | string[]
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ChatChannelCreateInput = {
    id?: string
    name: string
    description?: string | null
    createdAt?: Date | string
    createdBy: string
    isPrivate?: boolean
    members?: ChatChannelCreatemembersInput | string[]
    admins?: ChatChannelCreateadminsInput | string[]
    metadata?: InputJsonValue | null
    avatar?: string | null
    lastActive?: Date | string
  }

  export type ChatChannelUncheckedCreateInput = {
    id?: string
    name: string
    description?: string | null
    createdAt?: Date | string
    createdBy: string
    isPrivate?: boolean
    members?: ChatChannelCreatemembersInput | string[]
    admins?: ChatChannelCreateadminsInput | string[]
    metadata?: InputJsonValue | null
    avatar?: string | null
    lastActive?: Date | string
  }

  export type ChatChannelUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: StringFieldUpdateOperationsInput | string
    isPrivate?: BoolFieldUpdateOperationsInput | boolean
    members?: ChatChannelUpdatemembersInput | string[]
    admins?: ChatChannelUpdateadminsInput | string[]
    metadata?: InputJsonValue | InputJsonValue | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    lastActive?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ChatChannelUncheckedUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: StringFieldUpdateOperationsInput | string
    isPrivate?: BoolFieldUpdateOperationsInput | boolean
    members?: ChatChannelUpdatemembersInput | string[]
    admins?: ChatChannelUpdateadminsInput | string[]
    metadata?: InputJsonValue | InputJsonValue | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    lastActive?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ChatChannelCreateManyInput = {
    id?: string
    name: string
    description?: string | null
    createdAt?: Date | string
    createdBy: string
    isPrivate?: boolean
    members?: ChatChannelCreatemembersInput | string[]
    admins?: ChatChannelCreateadminsInput | string[]
    metadata?: InputJsonValue | null
    avatar?: string | null
    lastActive?: Date | string
  }

  export type ChatChannelUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: StringFieldUpdateOperationsInput | string
    isPrivate?: BoolFieldUpdateOperationsInput | boolean
    members?: ChatChannelUpdatemembersInput | string[]
    admins?: ChatChannelUpdateadminsInput | string[]
    metadata?: InputJsonValue | InputJsonValue | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    lastActive?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ChatChannelUncheckedUpdateManyInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: StringFieldUpdateOperationsInput | string
    isPrivate?: BoolFieldUpdateOperationsInput | boolean
    members?: ChatChannelUpdatemembersInput | string[]
    admins?: ChatChannelUpdateadminsInput | string[]
    metadata?: InputJsonValue | InputJsonValue | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    lastActive?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ChatUserCreateInput = {
    id?: string
    userId: string
    name: string
    avatar?: string | null
    status?: string
    lastSeen?: Date | string
    channels?: ChatUserCreatechannelsInput | string[]
    preferences?: InputJsonValue | null
    blockedUsers?: ChatUserCreateblockedUsersInput | string[]
    deviceTokens?: ChatUserCreatedeviceTokensInput | string[]
  }

  export type ChatUserUncheckedCreateInput = {
    id?: string
    userId: string
    name: string
    avatar?: string | null
    status?: string
    lastSeen?: Date | string
    channels?: ChatUserCreatechannelsInput | string[]
    preferences?: InputJsonValue | null
    blockedUsers?: ChatUserCreateblockedUsersInput | string[]
    deviceTokens?: ChatUserCreatedeviceTokensInput | string[]
  }

  export type ChatUserUpdateInput = {
    userId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    lastSeen?: DateTimeFieldUpdateOperationsInput | Date | string
    channels?: ChatUserUpdatechannelsInput | string[]
    preferences?: InputJsonValue | InputJsonValue | null
    blockedUsers?: ChatUserUpdateblockedUsersInput | string[]
    deviceTokens?: ChatUserUpdatedeviceTokensInput | string[]
  }

  export type ChatUserUncheckedUpdateInput = {
    userId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    lastSeen?: DateTimeFieldUpdateOperationsInput | Date | string
    channels?: ChatUserUpdatechannelsInput | string[]
    preferences?: InputJsonValue | InputJsonValue | null
    blockedUsers?: ChatUserUpdateblockedUsersInput | string[]
    deviceTokens?: ChatUserUpdatedeviceTokensInput | string[]
  }

  export type ChatUserCreateManyInput = {
    id?: string
    userId: string
    name: string
    avatar?: string | null
    status?: string
    lastSeen?: Date | string
    channels?: ChatUserCreatechannelsInput | string[]
    preferences?: InputJsonValue | null
    blockedUsers?: ChatUserCreateblockedUsersInput | string[]
    deviceTokens?: ChatUserCreatedeviceTokensInput | string[]
  }

  export type ChatUserUpdateManyMutationInput = {
    userId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    lastSeen?: DateTimeFieldUpdateOperationsInput | Date | string
    channels?: ChatUserUpdatechannelsInput | string[]
    preferences?: InputJsonValue | InputJsonValue | null
    blockedUsers?: ChatUserUpdateblockedUsersInput | string[]
    deviceTokens?: ChatUserUpdatedeviceTokensInput | string[]
  }

  export type ChatUserUncheckedUpdateManyInput = {
    userId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    lastSeen?: DateTimeFieldUpdateOperationsInput | Date | string
    channels?: ChatUserUpdatechannelsInput | string[]
    preferences?: InputJsonValue | InputJsonValue | null
    blockedUsers?: ChatUserUpdateblockedUsersInput | string[]
    deviceTokens?: ChatUserUpdatedeviceTokensInput | string[]
  }

  export type ChatAttachmentCreateInput = {
    id?: string
    messageId: string
    fileName: string
    fileType: string
    fileSize: number
    url: string
    thumbnail?: string | null
    uploadedAt?: Date | string
    uploadedBy: string
    metadata?: InputJsonValue | null
  }

  export type ChatAttachmentUncheckedCreateInput = {
    id?: string
    messageId: string
    fileName: string
    fileType: string
    fileSize: number
    url: string
    thumbnail?: string | null
    uploadedAt?: Date | string
    uploadedBy: string
    metadata?: InputJsonValue | null
  }

  export type ChatAttachmentUpdateInput = {
    messageId?: StringFieldUpdateOperationsInput | string
    fileName?: StringFieldUpdateOperationsInput | string
    fileType?: StringFieldUpdateOperationsInput | string
    fileSize?: IntFieldUpdateOperationsInput | number
    url?: StringFieldUpdateOperationsInput | string
    thumbnail?: NullableStringFieldUpdateOperationsInput | string | null
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    uploadedBy?: StringFieldUpdateOperationsInput | string
    metadata?: InputJsonValue | InputJsonValue | null
  }

  export type ChatAttachmentUncheckedUpdateInput = {
    messageId?: StringFieldUpdateOperationsInput | string
    fileName?: StringFieldUpdateOperationsInput | string
    fileType?: StringFieldUpdateOperationsInput | string
    fileSize?: IntFieldUpdateOperationsInput | number
    url?: StringFieldUpdateOperationsInput | string
    thumbnail?: NullableStringFieldUpdateOperationsInput | string | null
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    uploadedBy?: StringFieldUpdateOperationsInput | string
    metadata?: InputJsonValue | InputJsonValue | null
  }

  export type ChatAttachmentCreateManyInput = {
    id?: string
    messageId: string
    fileName: string
    fileType: string
    fileSize: number
    url: string
    thumbnail?: string | null
    uploadedAt?: Date | string
    uploadedBy: string
    metadata?: InputJsonValue | null
  }

  export type ChatAttachmentUpdateManyMutationInput = {
    messageId?: StringFieldUpdateOperationsInput | string
    fileName?: StringFieldUpdateOperationsInput | string
    fileType?: StringFieldUpdateOperationsInput | string
    fileSize?: IntFieldUpdateOperationsInput | number
    url?: StringFieldUpdateOperationsInput | string
    thumbnail?: NullableStringFieldUpdateOperationsInput | string | null
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    uploadedBy?: StringFieldUpdateOperationsInput | string
    metadata?: InputJsonValue | InputJsonValue | null
  }

  export type ChatAttachmentUncheckedUpdateManyInput = {
    messageId?: StringFieldUpdateOperationsInput | string
    fileName?: StringFieldUpdateOperationsInput | string
    fileType?: StringFieldUpdateOperationsInput | string
    fileSize?: IntFieldUpdateOperationsInput | number
    url?: StringFieldUpdateOperationsInput | string
    thumbnail?: NullableStringFieldUpdateOperationsInput | string | null
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    uploadedBy?: StringFieldUpdateOperationsInput | string
    metadata?: InputJsonValue | InputJsonValue | null
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
    isSet?: boolean
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }
  export type JsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    isSet?: boolean
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    has?: string | StringFieldRefInput<$PrismaModel> | null
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
    isSet?: boolean
  }

  export type ChatMessageCountOrderByAggregateInput = {
    id?: SortOrder
    senderId?: SortOrder
    senderName?: SortOrder
    content?: SortOrder
    recipientId?: SortOrder
    channelName?: SortOrder
    recipientName?: SortOrder
    recipientAvatar?: SortOrder
    timestamp?: SortOrder
    status?: SortOrder
    type?: SortOrder
    sentiment?: SortOrder
    translation?: SortOrder
    aiGenerated?: SortOrder
    contextData?: SortOrder
    effect?: SortOrder
    priority?: SortOrder
    reactions?: SortOrder
    bookmarked?: SortOrder
    spatial?: SortOrder
    metadata?: SortOrder
    attachments?: SortOrder
    threadId?: SortOrder
    edited?: SortOrder
    editHistory?: SortOrder
    mentions?: SortOrder
    tags?: SortOrder
    readBy?: SortOrder
    expiresAt?: SortOrder
  }

  export type ChatMessageMaxOrderByAggregateInput = {
    id?: SortOrder
    senderId?: SortOrder
    senderName?: SortOrder
    content?: SortOrder
    recipientId?: SortOrder
    channelName?: SortOrder
    recipientName?: SortOrder
    recipientAvatar?: SortOrder
    timestamp?: SortOrder
    status?: SortOrder
    type?: SortOrder
    sentiment?: SortOrder
    aiGenerated?: SortOrder
    effect?: SortOrder
    priority?: SortOrder
    bookmarked?: SortOrder
    threadId?: SortOrder
    edited?: SortOrder
    expiresAt?: SortOrder
  }

  export type ChatMessageMinOrderByAggregateInput = {
    id?: SortOrder
    senderId?: SortOrder
    senderName?: SortOrder
    content?: SortOrder
    recipientId?: SortOrder
    channelName?: SortOrder
    recipientName?: SortOrder
    recipientAvatar?: SortOrder
    timestamp?: SortOrder
    status?: SortOrder
    type?: SortOrder
    sentiment?: SortOrder
    aiGenerated?: SortOrder
    effect?: SortOrder
    priority?: SortOrder
    bookmarked?: SortOrder
    threadId?: SortOrder
    edited?: SortOrder
    expiresAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
    isSet?: boolean
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
    isSet?: boolean
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
    isSet?: boolean
  }

  export type ChatChannelCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
    createdBy?: SortOrder
    isPrivate?: SortOrder
    members?: SortOrder
    admins?: SortOrder
    metadata?: SortOrder
    avatar?: SortOrder
    lastActive?: SortOrder
  }

  export type ChatChannelMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
    createdBy?: SortOrder
    isPrivate?: SortOrder
    avatar?: SortOrder
    lastActive?: SortOrder
  }

  export type ChatChannelMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
    createdBy?: SortOrder
    isPrivate?: SortOrder
    avatar?: SortOrder
    lastActive?: SortOrder
  }

  export type ChatUserCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    avatar?: SortOrder
    status?: SortOrder
    lastSeen?: SortOrder
    channels?: SortOrder
    preferences?: SortOrder
    blockedUsers?: SortOrder
    deviceTokens?: SortOrder
  }

  export type ChatUserMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    avatar?: SortOrder
    status?: SortOrder
    lastSeen?: SortOrder
  }

  export type ChatUserMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    avatar?: SortOrder
    status?: SortOrder
    lastSeen?: SortOrder
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type ChatAttachmentCountOrderByAggregateInput = {
    id?: SortOrder
    messageId?: SortOrder
    fileName?: SortOrder
    fileType?: SortOrder
    fileSize?: SortOrder
    url?: SortOrder
    thumbnail?: SortOrder
    uploadedAt?: SortOrder
    uploadedBy?: SortOrder
    metadata?: SortOrder
  }

  export type ChatAttachmentAvgOrderByAggregateInput = {
    fileSize?: SortOrder
  }

  export type ChatAttachmentMaxOrderByAggregateInput = {
    id?: SortOrder
    messageId?: SortOrder
    fileName?: SortOrder
    fileType?: SortOrder
    fileSize?: SortOrder
    url?: SortOrder
    thumbnail?: SortOrder
    uploadedAt?: SortOrder
    uploadedBy?: SortOrder
  }

  export type ChatAttachmentMinOrderByAggregateInput = {
    id?: SortOrder
    messageId?: SortOrder
    fileName?: SortOrder
    fileType?: SortOrder
    fileSize?: SortOrder
    url?: SortOrder
    thumbnail?: SortOrder
    uploadedAt?: SortOrder
    uploadedBy?: SortOrder
  }

  export type ChatAttachmentSumOrderByAggregateInput = {
    fileSize?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type ChatMessageCreatetagsInput = {
    set: string[]
  }

  export type ChatMessageCreatereadByInput = {
    set: string[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
    unset?: boolean
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type ChatMessageUpdatetagsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type ChatMessageUpdatereadByInput = {
    set?: string[]
    push?: string | string[]
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
    unset?: boolean
  }

  export type ChatChannelCreatemembersInput = {
    set: string[]
  }

  export type ChatChannelCreateadminsInput = {
    set: string[]
  }

  export type ChatChannelUpdatemembersInput = {
    set?: string[]
    push?: string | string[]
  }

  export type ChatChannelUpdateadminsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type ChatUserCreatechannelsInput = {
    set: string[]
  }

  export type ChatUserCreateblockedUsersInput = {
    set: string[]
  }

  export type ChatUserCreatedeviceTokensInput = {
    set: string[]
  }

  export type ChatUserUpdatechannelsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type ChatUserUpdateblockedUsersInput = {
    set?: string[]
    push?: string | string[]
  }

  export type ChatUserUpdatedeviceTokensInput = {
    set?: string[]
    push?: string | string[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
    isSet?: boolean
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
    isSet?: boolean
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
    isSet?: boolean
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
    isSet?: boolean
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    isSet?: boolean
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
    isSet?: boolean
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
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
  export const dmmf: runtime.BaseDMMF
}