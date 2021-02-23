type int32 = number;
type int64 = number;
type float = number;
type double = number;
type byte = string;
type binary = string;
type date = string;
type datetime = string;
type password = string;

/**
 * @title AddressDetailParam
 */
export type AddressDetailParam = {
  /**
   * @description 城市
   */
  city?: string;
  /**
   * @description 城市ID
   */
  city_id?: int32;
  /**
   * @description 地区
   */
  district?: string;
  /**
   * @description 省份
   */
  province?: string;
};
/**
 * @title AddressParam
 */
export type AddressParam = {
  /**
   * @description 收货地址详情
   */
  address?: AddressDetailParam;
  /**
   * @description 收货详细地址
   */
  detail?: string;
  /**
   * @description 地址ID
   */
  id?: string;
  /**
   * @description 是否默认收货地址 true是 false否
   */
  is_default?: string;
  /**
   * @description 收货手机号码
   */
  phone?: string;
  /**
   * @description 收货地址邮编
   */
  post_code?: string;
  /**
   * @description 收货地址真实名字
   */
  real_name?: string;
  /**
   */
  wx_export?: string;
};
/**
 * @title AttrValueDto
 */
export type AttrValueDto = {
  /**
   * @description 属性
   */
  attr?: string;
  /**
   * @description 是否选择
   */
  check?: boolean;
};
/**
 * @title BargainCountVo
 */
export type BargainCountVo = {
  /**
   */
  alreadyPrice?: double;
  /**
   */
  count?: int32;
  /**
   */
  price?: double;
  /**
   */
  pricePercent?: int32;
  /**
   */
  status?: int32;
  /**
   */
  userBargainStatus?: boolean;
};
/**
 * @title BargainShareParam
 */
export type BargainShareParam = {
  /**
   * @description 砍价产品ID
   */
  bargainId?: string;
  /**
   * @description 来源
   */
  from?: string;
};
/**
 * @title BargainVo
 */
export type BargainVo = {
  /**
   */
  bargain?: YxStoreBargainQueryVo对象;
  /**
   */
  bargainSumCount?: int32;
  /**
   */
  userInfo?: YxUserQueryVo对象;
};
/**
 * @title BindPhoneParam
 */
export type BindPhoneParam = {
  /**
   * @description 验证码
   */
  captcha?: string;
  /**
   * @description 手机号码
   */
  phone?: string;
};
/**
 * @title CartIdsParm
 */
export type CartIdsParm = {
  /**
   * @description 购物车ID，多个用,分隔开
   */
  ids?: Array<string>;
};
/**
 * @title CartNumParam
 */
export type CartNumParam = {
  /**
   * @description 购物车ID
   */
  id?: int64;
  /**
   * @description 购物车数量
   */
  number?: int32;
};
/**
 * @title CartParam
 */
export type CartParam = {
  /**
   * @description 产品砍价ID
   */
  bargainId?: int64;
  /**
   * @description 购物车数量
   */
  cartNum?: int32;
  /**
   * @description 产品拼团ID
   */
  combinationId?: int64;
  /**
   * @description 是否新购买
   */
  new?: int32;
  /**
   * @description 产品ID
   */
  productId?: int64;
  /**
   * @description 产品秒杀ID
   */
  secKillId?: int64;
  /**
   * @description 唯一的ID
   */
  uniqueId?: string;
};
/**
 * @title CateDTO
 */
export type CateDTO = {
  /**
   */
  cateName?: string;
  /**
   */
  children?: Array<CateDTO>;
  /**
   */
  id?: int64;
  /**
   */
  pic?: string;
  /**
   */
  pid?: int64;
};
/**
 * @title CityVo
 */
export type CityVo = {
  /**
   */
  c?: Array<CityVo>;
  /**
   */
  n?: string;
  /**
   */
  pid?: int32;
  /**
   */
  v?: int32;
};
/**
 * @title CombinationQueryVo
 */
export type CombinationQueryVo = {
  /**
   */
  lastPage?: int64;
  /**
   */
  storeCombinationQueryVos?: Array<YxStoreCombinationQueryVo对象>;
};
/**
 * @title ComputeOrderParam
 */
export type ComputeOrderParam = {
  /**
   * @description 地址ID
   */
  addressId?: string;
  /**
   * @description 砍价ID
   */
  bargainId?: string;
  /**
   * @description 拼团ID
   */
  combinationId?: string;
  /**
   * @description 优惠券ID
   */
  couponId?: string;
  /**
   * @description 支付方式
   */
  payType?: string;
  /**
   * @description 拼团ID
   */
  pinkId?: string;
  /**
   * @description 配送方式 1=快递 ，2=门店自提
   */
  shipping_type?: string;
  /**
   * @description 使用积分 1-表示使用
   */
  useIntegral?: string;
};
/**
 * @title ConfirmOrderParam
 */
export type ConfirmOrderParam = {
  /**
   * @description 购物车ID
   */
  cartId?: string;
};
/**
 * @title ConfirmOrderVo
 */
export type ConfirmOrderVo = {
  /**
   */
  addressInfo?: YxUserAddress对象;
  /**
   */
  bargainId?: int32;
  /**
   */
  cartInfo?: Array<YxStoreCartQueryVo对象>;
  /**
   */
  combinationId?: int32;
  /**
   */
  deduction?: boolean;
  /**
   */
  enableIntegral?: boolean;
  /**
   */
  enableIntegralNum?: double;
  /**
   */
  integralRatio?: int32;
  /**
   */
  orderKey?: string;
  /**
   */
  priceGroup?: PriceGroupDto;
  /**
   */
  seckillId?: int32;
  /**
   */
  storeSelfMention?: int32;
  /**
   */
  systemStore?: YxSystemStoreQueryVo对象;
  /**
   */
  usableCoupon?: StoreCouponUserVo;
  /**
   */
  userInfo?: YxUserQueryVo对象;
};
/**
 * @title DoOrderParam
 */
export type DoOrderParam = {
  /**
   * @description 订单ID
   */
  uni?: string;
};
/**
 * @title ExpressInfo
 */
export type ExpressInfo = {
  /**
   * @description 用户ID
   */
  EBusinessID?: string;
  /**
   * @description 物流运单号
   */
  LogisticCode?: string;
  /**
   * @description 订单编号
   */
  OrderCode?: string;
  /**
   * @description 失败原因
   */
  Reason?: string;
  /**
   * @description 快递公司编码
   */
  ShipperCode?: string;
  /**
   * @description 物流状态：2-在途中,3-签收,4-问题件
   */
  State?: string;
  /**
   * @description 成功与否
   */
  Success?: boolean;
  /**
   * @description 物流轨迹
   */
  Traces?: Array<Traces>;
  /**
   */
  ebusinessID?: string;
  /**
   */
  logisticCode?: string;
  /**
   */
  orderCode?: string;
  /**
   */
  reason?: string;
  /**
   */
  shipperCode?: string;
  /**
   */
  shipperName?: string;
  /**
   */
  state?: string;
  /**
   */
  success?: boolean;
  /**
   */
  traces?: Array<Traces>;
};
/**
 * @title ExpressParam
 */
export type ExpressParam = {
  /**
   * @description 物流单号
   */
  logisticCode?: string;
  /**
   * @description 订单编号
   */
  orderCode?: string;
  /**
   * @description 快递公司编码
   */
  shipperCode?: string;
};
/**
 * @title HLoginParam
 */
export type HLoginParam = {
  /**
   * @description 密码
   */
  password?: string;
  /**
   * @description 分销绑定关系的ID
   */
  spread?: string;
  /**
   * @description 用户名
   */
  username?: string;
};
/**
 * @title HandleOrderParam
 */
export type HandleOrderParam = {
  /**
   * @description 订单ID
   */
  id?: string;
};
/**
 * @title ID参数
 */
export type ID参数 = {
  /**
   * @description 地址ID
   */
  id?: string;
};
/**
 * @title JSONObject
 */
export type JSONObject = Record<string, object>;
/**
 * @title LiveReplay
 */
export type LiveReplay = {
  /**
   */
  createTime?: string;
  /**
   */
  expireTime?: string;
  /**
   */
  mediaUrl?: string;
};
/**
 * @title LoginParam
 */
export type LoginParam = {
  /**
   * @description 小程序登陆code
   */
  code?: string;
  /**
   * @description 小程序完整用户信息的加密数据
   */
  encryptedData?: string;
  /**
   * @description 小程序加密算法的初始向量
   */
  iv?: string;
  /**
   * @description 分销绑定关系的ID
   */
  spread?: string;
};
/**
 * @title OrderCartInfoVo
 */
export type OrderCartInfoVo = {
  /**
   * @description 砍价产品ID
   */
  bargainId?: int64;
  /**
   * @description 购物车数量
   */
  cartNum?: int32;
  /**
   * @description 拼团产品ID
   */
  combinationId?: int64;
  /**
   * @description 订单ID
   */
  orderId?: string;
  /**
   * @description 商品ID
   */
  productId?: int64;
  /**
   * @description 产品信息
   */
  productInfo?: ProductDto;
  /**
   * @description 秒杀产品ID
   */
  seckillId?: int64;
};
/**
 * @title OrderDataVo
 */
export type OrderDataVo = {
  /**
   */
  count?: int32;
  /**
   */
  price?: double;
  /**
   */
  time?: string;
};
/**
 * @title OrderDeliveryParam
 */
export type OrderDeliveryParam = {
  /**
   * @description 快递单号
   */
  deliveryId?: string;
  /**
   * @description 快递公司
   */
  deliveryName?: string;
  /**
   * @description 快递方式
   */
  deliveryType?: string;
  /**
   * @description 订单ID
   */
  orderId?: string;
};
/**
 * @title OrderParam
 */
export type OrderParam = {
  /**
   * @description 地址ID
   */
  addressId?: string;
  /**
   * @description 砍价产品ID
   */
  bargainId?: string;
  /**
   * @description 拼团ID
   */
  combinationId?: string;
  /**
   * @description 优惠券ID
   */
  couponId?: string;
  /**
   * @description 来源
   */
  from?: string;
  /**
   * @description 支付渠道(0微信公众号1微信小程序)
   */
  isChannel?: string;
  /**
   * @description 备注
   */
  mark?: string;
  /**
   * @description 支付方式
   */
  payType?: string;
  /**
   * @description 门店电话
   */
  phone?: string;
  /**
   * @description 拼团id 0没有拼团
   */
  pinkId?: string;
  /**
   * @description 门店联系人
   */
  realName?: string;
  /**
   * @description 秒杀产品ID
   */
  seckillId?: string;
  /**
   * @description 配送方式 1=快递 ，2=门店自提
   */
  shippingType?: string;
  /**
   * @description 门店ID
   */
  storeId?: string;
  /**
   * @description 使用积分 1-表示使用
   */
  useIntegral?: string;
};
/**
 * @title OrderPriceParam
 */
export type OrderPriceParam = {
  /**
   * @description 订单ID
   */
  orderId?: string;
  /**
   * @description 商品价格
   */
  price?: string;
};
/**
 * @title OrderRefundParam
 */
export type OrderRefundParam = {
  /**
   * @description 订单ID
   */
  orderId?: string;
  /**
   * @description 退款金额
   */
  price?: string;
  /**
   * @description 类型：1同意 2拒绝
   */
  type?: int32;
};
/**
 * @title OrderVerifyParam
 */
export type OrderVerifyParam = {
  /**
   * @description 订单核销状态：1确认0正常
   */
  isConfirm?: int32;
  /**
   * @description 核销码
   */
  verifyCode?: string;
};
/**
 * @title PageResult«YxAppVersionDto»
 */
export type PageResult_YxAppVersionDto_ = {
  /**
   * @description 内容
   */
  content?: Array<YxAppVersionDto>;
  /**
   * @description 总数量
   */
  totalElements?: int64;
};
/**
 * @title PayParam
 */
export type PayParam = {
  /**
   * @description 来源
   */
  from?: string;
  /**
   * @description 支付类型
   */
  paytype?: string;
  /**
   * @description 订单ID
   */
  uni?: string;
};
/**
 * @title PinkCancelParam
 */
export type PinkCancelParam = {
  /**
   * @description 团购产品id
   */
  cid?: string;
  /**
   * @description 拼团产品ID
   */
  id?: string;
};
/**
 * @title PinkDto
 */
export type PinkDto = {
  /**
   * @description 拼团用户头像
   */
  avatar?: string;
  /**
   * @description 参与的拼团的id集合
   */
  count?: string;
  /**
   * @description 拼团时效：小时
   */
  h?: string;
  /**
   * @description 拼团时效：分钟
   */
  i?: string;
  /**
   * @description 拼团ID
   */
  id?: int64;
  /**
   * @description 拼团用户昵称
   */
  nickname?: string;
  /**
   * @description 拼团总人数
   */
  people?: int32;
  /**
   * @description 拼团产品单价
   */
  price?: double;
  /**
   * @description 拼团时效：秒
   */
  s?: string;
  /**
   * @description 拼团结束时间
   */
  stopTime?: datetime;
  /**
   * @description 用户ID
   */
  uid?: int64;
};
/**
 * @title PinkInfoVo
 */
export type PinkInfoVo = {
  /**
   * @description 还差几人成团
   */
  count?: int32;
  /**
   * @description 当前拼团数据返回订单编号
   */
  currentPinkOrder?: string;
  /**
   * @description 是否完成 0未完成 1完成
   */
  isOk?: int32;
  /**
   * @description 拼团信息列表
   */
  pinkAll?: Array<YxStorePinkQueryVo对象>;
  /**
   * @description 拼团状态 0未成功，进行中 1已成功 -1拼团失败
   */
  pinkBool?: int32;
  /**
   * @description 拼团信息
   */
  pinkT?: YxStorePinkQueryVo对象;
  /**
   * @description 拼团内容信息
   */
  storeCombination?: YxStoreCombinationQueryVo对象;
  /**
   * @description 拼团内容
   */
  storeCombinationHost?: string;
  /**
   * @description 库存唯一值
   */
  uniqueId?: string;
  /**
   * @description 是否在团内 0不在 1在
   */
  userBool?: int32;
  /**
   * @description 拼团用户信息
   */
  userInfo?: YxUserQueryVo对象;
};
/**
 * @title PinkShareParam
 */
export type PinkShareParam = {
  /**
   * @description 来源
   */
  from?: string;
  /**
   */
  id?: string;
};
/**
 * @title PriceGroupDto
 */
export type PriceGroupDto = {
  /**
   */
  costPrice?: number;
  /**
   */
  storeFreePostage?: number;
  /**
   */
  storePostage?: number;
  /**
   */
  totalPrice?: number;
  /**
   */
  vipPrice?: number;
};
/**
 * @title ProductAttrDto
 */
export type ProductAttrDto = {
  /**
   * @description 产品属性图片
   */
  image?: string;
  /**
   * @description 产品属性价格
   */
  price?: double;
  /**
   * @description 产品属性ID
   */
  productId?: int64;
  /**
   * @description 产品属性sku
   */
  sku?: string;
};
/**
 * @title ProductDto
 */
export type ProductDto = {
  /**
   * @description 产品属性信息
   */
  attrInfo?: ProductAttrDto;
  /**
   * @description 产品图片
   */
  image?: string;
  /**
   * @description 产品价格
   */
  price?: double;
  /**
   * @description 产品名称
   */
  storeName?: string;
};
/**
 * @title ProductOrderParam
 */
export type ProductOrderParam = {
  /**
   * @description 订单唯一值
   */
  unique?: string;
};
/**
 * @title ProductReplyParam
 */
export type ProductReplyParam = {
  /**
   * @description 商品评论内容
   */
  comment?: string;
  /**
   * @description 商品评论图片地址
   */
  pics?: string;
  /**
   * @description 商品评分
   */
  productScore?: string;
  /**
   * @description 服务评分
   */
  serviceScore?: string;
  /**
   * @description 订单唯一值
   */
  unique?: string;
};
/**
 * @title ProductVo
 */
export type ProductVo = {
  /**
   * @description 商品信息列表
   */
  goodList?: Array<YxStoreProductQueryVo对象>;
  /**
   * @description 腾讯地图key
   */
  mapKey?: string;
  /**
   * @description 商户ID，预留字段
   */
  merId?: int32;
  /**
   */
  priceName?: string;
  /**
   */
  productAttr?: Array<YxStoreProductAttrQueryVo对象>;
  /**
   */
  productValue?: Record<string, object>;
  /**
   * @description 评论信息
   */
  reply?: YxStoreProductReplyQueryVo对象;
  /**
   * @description 回复渠道
   */
  replyChance?: string;
  /**
   * @description 回复数
   */
  replyCount?: int32;
  /**
   */
  similarity?: Array<unknown>;
  /**
   * @description 商品信息
   */
  storeInfo?: YxStoreProductQueryVo对象;
  /**
   * @description 门店信息
   */
  systemStore?: YxSystemStoreQueryVo对象;
  /**
   * @description 模版名称
   */
  tempName?: string;
  /**
   * @description 用户ID
   */
  uid?: int32;
};
/**
 * @title PromParam
 */
export type PromParam = {
  /**
   * @description 推荐人级别 0一级推荐人 1二级推荐人
   */
  grade?: int32;
  /**
   * @description 关键字搜索
   */
  keyword?: string;
  /**
   * @description 页码
   */
  limit?: int32;
  /**
   * @description 页大小
   */
  page?: int32;
  /**
   * @description 排序
   */
  sort?: string;
};
/**
 * @title RechargeParam
 */
export type RechargeParam = {
  /**
   * @description 来源
   */
  from?: string;
  /**
   * @description 充值单号
   */
  orderSn?: string;
  /**
   * @description 赠送金额
   */
  paid_price?: double;
  /**
   * @description 充值金额
   */
  price?: double;
  /**
   * @description 用户充值ID
   */
  rechar_id?: string;
};
/**
 * @title RefundParam
 */
export type RefundParam = {
  /**
   * @description 退款备注
   */
  refund_reason_wap_explain?: string;
  /**
   * @description 退款图片
   */
  refund_reason_wap_img?: string;
  /**
   * @description 退款原因
   */
  text?: string;
  /**
   * @description 订单唯一值
   */
  uni?: string;
};
/**
 * @title RegParam
 */
export type RegParam = {
  /**
   * @description 手机号码
   */
  account?: string;
  /**
   * @description 验证码
   */
  captcha?: string;
  /**
   * @description 邀请码
   */
  inviteCode?: string;
  /**
   * @description 密码
   */
  password?: string;
  /**
   * @description 分销绑定关系的ID
   */
  spread?: string;
};
/**
 * @title ReplyCountVo
 */
export type ReplyCountVo = {
  /**
   * @description 好评数
   */
  goodCount?: int32;
  /**
   * @description 中评数
   */
  inCount?: int32;
  /**
   * @description 差评数
   */
  poorCount?: int32;
  /**
   * @description 好评率
   */
  replyChance?: string;
  /**
   * @description 好评星星数
   */
  replySstar?: string;
  /**
   * @description 总的评论数
   */
  sumCount?: int32;
};
/**
 * @title SeckillConfigVo
 */
export type SeckillConfigVo = {
  /**
   */
  lovely?: string;
  /**
   * @description 秒杀产品时间信息
   */
  seckillTime?: Array<SeckillTimeDto>;
  /**
   * @description 秒杀产品时间索引
   */
  seckillTimeIndex?: int32;
};
/**
 * @title SeckillTimeDto
 */
export type SeckillTimeDto = {
  /**
   */
  id?: int32;
  /**
   * @description 秒杀产品状态显示中文值
   */
  state?: string;
  /**
   * @description 秒杀产品状态
   */
  status?: int32;
  /**
   * @description 秒杀产品停止时间
   */
  stop?: int32;
  /**
   * @description 秒杀产品时间：00:00
   */
  time?: string;
};
/**
 * @title SignVo
 */
export type SignVo = {
  /**
   */
  addTime?: string;
  /**
   */
  number?: int32;
  /**
   */
  title?: string;
};
/**
 * @title StatusDto
 */
export type StatusDto = {
  /**
   */
  _class?: string;
  /**
   */
  _msg?: string;
  /**
   */
  _payType?: string;
  /**
   */
  _title?: string;
  /**
   */
  _type?: string;
};
/**
 * @title StoreCombinationVo
 */
export type StoreCombinationVo = {
  /**
   * @description 参与的拼团的id 集合
   */
  pindAll?: Array<int64>;
  /**
   * @description 拼团详情
   */
  pink?: Array<PinkDto>;
  /**
   * @description 拼团成功的用户信息
   */
  pinkOkList?: Array<string>;
  /**
   * @description 拼团完成的商品总件数
   */
  pinkOkSum?: int32;
  /**
   * @description 拼团产品属性信息
   */
  productAttr?: Array<YxStoreProductAttrQueryVo对象>;
  /**
   * @description 拼团产品属性值
   */
  productValue?: Record<string, object>;
  /**
   * @description 拼团评论信息
   */
  reply?: YxStoreProductReplyQueryVo对象;
  /**
   * @description 拼团好评比例
   */
  replyChance?: string;
  /**
   * @description 拼团评论总条数
   */
  replyCount?: int32;
  /**
   * @description 拼团产品表信息
   */
  storeInfo?: YxStoreCombinationQueryVo对象;
  /**
   * @description 拼团产品运费模板名称
   */
  tempName?: string;
  /**
   * @description 拼团产品用户是否收藏
   */
  userCollect?: boolean;
};
/**
 * @title StoreCouponUserVo
 */
export type StoreCouponUserVo = {
  /**
   * @description 优惠券的面值
   */
  couponPrice?: double;
  /**
   * @description 优惠券名称
   */
  couponTitle?: string;
  /**
   * @description 优惠券结束时间
   */
  endTime?: datetime;
  /**
   * @description 优惠券发放记录ID
   */
  id?: int64;
  /**
   * @description 优惠产品ID
   */
  productId?: string;
  /**
   * @description 优惠券类型 0通用券 1商品券 2内部券
   */
  type?: int32;
  /**
   * @description 最低消费多少金额可用优惠券
   */
  useMinPrice?: double;
};
/**
 * @title StoreSeckillVo
 */
export type StoreSeckillVo = {
  /**
   */
  productAttr?: Array<YxStoreProductAttrQueryVo对象>;
  /**
   */
  productValue?: Record<string, object>;
  /**
   * @description 秒杀产品评论信息
   */
  reply?: YxStoreProductReplyQueryVo对象;
  /**
   * @description 秒杀产品评论数量
   */
  replyCount?: int32;
  /**
   * @description 秒杀产品信息
   */
  storeInfo?: YxStoreSeckillQueryVo对象;
  /**
   * @description 模板名称
   */
  tempName?: string;
  /**
   * @description 秒杀产品用户是否收藏
   */
  userCollect?: boolean;
};
/**
 * @title TopCountVo
 */
export type TopCountVo = {
  /**
   */
  lookCount?: int32;
  /**
   */
  shareCount?: int32;
  /**
   */
  userCount?: int32;
};
/**
 * @title Traces
 */
export type Traces = {
  /**
   * @description 描述
   */
  AcceptStation?: string;
  /**
   * @description 时间
   */
  AcceptTime?: string;
  /**
   */
  acceptStation?: string;
  /**
   */
  acceptTime?: string;
};
/**
 * @title UserEditParam
 */
export type UserEditParam = {
  /**
   * @description 用户头像
   */
  avatar?: string;
  /**
   * @description 用户昵称
   */
  nickname?: string;
};
/**
 * @title UserExtParam
 */
export type UserExtParam = {
  /**
   * @description 提现支付宝用户名
   */
  alipayCode?: string;
  /**
   * @description 提现类型 weixin alipay
   */
  extractType?: string;
  /**
   * @description 提现金额
   */
  money?: string;
  /**
   * @description 支付宝账号
   */
  name?: string;
  /**
   * @description 微信号
   */
  weixin?: string;
};
/**
 * @title UserOrderCountVo
 */
export type UserOrderCountVo = {
  /**
   * @description 订单已完成数量
   */
  completeCount?: int32;
  /**
   * @description 订单待评价数量
   */
  evaluatedCount?: int32;
  /**
   * @description 订单支付没有退款数量
   */
  orderCount?: int32;
  /**
   * @description 订单待收货数量
   */
  receivedCount?: int32;
  /**
   * @description 订单退款数量
   */
  refundCount?: int32;
  /**
   * @description 订单支付没有退款支付总金额
   */
  sumPrice?: double;
  /**
   * @description 订单待支付数量
   */
  unpaidCount?: int32;
  /**
   * @description 订单待发货数量
   */
  unshippedCount?: int32;
};
/**
 * @title VerityParam
 */
export type VerityParam = {
  /**
   * @description 手机号码
   */
  phone?: string;
  /**
   * @description 短信类型 bind绑定手机短信 login登陆短信 register注册短信
   */
  type?: string;
};
/**
 * @title WechatLiveVo
 */
export type WechatLiveVo = {
  /**
   */
  content?: Array<YxWechatLiveDto>;
  /**
   */
  lastPage?: int32;
  /**
   */
  pageNumber?: int32;
  /**
   */
  totalElements?: int64;
};
/**
 * @title WxPhoneParam
 */
export type WxPhoneParam = {
  /**
   * @description 小程序完整用户信息的加密数据
   */
  encryptedData?: string;
  /**
   * @description 小程序加密算法的初始向量
   */
  iv?: string;
};
/**
 * @title YxAppVersion
 */
export type YxAppVersion = {
  /**
   */
  androidUrl?: string;
  /**
   */
  createTime?: datetime;
  /**
   */
  forceUpdate?: int32;
  /**
   */
  id?: int32;
  /**
   */
  iosUrl?: string;
  /**
   */
  updateTime?: datetime;
  /**
   */
  versionCode?: string;
  /**
   */
  versionInfo?: string;
  /**
   */
  versionName?: string;
};
/**
 * @title YxAppVersionDto
 */
export type YxAppVersionDto = {
  /**
   */
  androidUrl?: string;
  /**
   */
  createTime?: datetime;
  /**
   */
  forceUpdate?: int32;
  /**
   */
  id?: int32;
  /**
   */
  iosUrl?: string;
  /**
   */
  isDel?: int32;
  /**
   */
  updateTime?: datetime;
  /**
   */
  versionCode?: string;
  /**
   */
  versionInfo?: string;
  /**
   */
  versionName?: string;
};
/**
 * @title YxAppVersionVo
 */
export type YxAppVersionVo = {
  /**
   */
  downloadUrl?: string;
  /**
   */
  forceUpdate?: boolean;
  /**
   */
  id?: int32;
  /**
   */
  versionCode?: string;
  /**
   */
  versionInfo?: string;
  /**
   */
  versionName?: string;
};
/**
 * @title YxArticleQueryVo对象
 * @description 文章管理表查询参数
 */
export type YxArticleQueryVo对象 = {
  /**
   * @description 添加时间
   */
  addTime?: string;
  /**
   * @description 文章作者
   */
  author?: string;
  /**
   * @description 文章内容
   */
  content?: string;
  /**
   * @description 文章管理ID
   */
  id?: int32;
  /**
   * @description 文章图片
   */
  imageInput?: string;
  /**
   * @description 文章分享简介
   */
  shareSynopsis?: string;
  /**
   * @description 文章分享标题
   */
  shareTitle?: string;
  /**
   * @description 排序
   */
  sort?: int32;
  /**
   * @description 状态
   */
  status?: boolean;
  /**
   * @description 文章简介
   */
  synopsis?: string;
  /**
   * @description 文章标题
   */
  title?: string;
  /**
   * @description 原文链接
   */
  url?: string;
  /**
   * @description 浏览次数
   */
  visit?: string;
};
/**
 * @title YxStoreBargainQueryVo对象
 * @description 砍价表查询参数
 */
export type YxStoreBargainQueryVo对象 = {
  /**
   * @description 用户每次砍价的最大金额
   */
  bargainMaxPrice?: number;
  /**
   * @description 用户每次砍价的最小金额
   */
  bargainMinPrice?: number;
  /**
   * @description 用户每次砍价的次数
   */
  bargainNum?: int32;
  /**
   * @description 成本价
   */
  cost?: number;
  /**
   * @description 砍价详情
   */
  description?: string;
  /**
   * @description 反多少积分
   */
  giveIntegral?: number;
  /**
   * @description 砍价产品ID
   */
  id?: int64;
  /**
   * @description 砍价活动图片
   */
  image?: string;
  /**
   * @description 砍价产品轮播图
   */
  images?: string;
  /**
   * @description 砍价活动简介
   */
  info?: string;
  /**
   * @description 砍价产品浏览量
   */
  look?: int32;
  /**
   * @description 砍价商品最低价
   */
  minPrice?: number;
  /**
   * @description 每次购买的砍价产品数量
   */
  num?: int32;
  /**
   * @description 砍价产品参与人数
   */
  people?: int32;
  /**
   * @description 邮费
   */
  postage?: number;
  /**
   * @description 砍价金额
   */
  price?: number;
  /**
   * @description 关联产品ID
   */
  productId?: int64;
  /**
   * @description 砍价规则
   */
  rule?: string;
  /**
   * @description 销量
   */
  sales?: int32;
  /**
   * @description 砍价产品分享量
   */
  share?: int32;
  /**
   * @description 排序
   */
  sort?: int32;
  /**
   * @description 砍价开启时间
   */
  startTime?: datetime;
  /**
   * @description 砍价状态 0(到砍价时间不自动开启)  1(到砍价时间自动开启时间)
   */
  status?: int32;
  /**
   * @description 库存
   */
  stock?: int32;
  /**
   * @description 砍价结束时间
   */
  stopTime?: datetime;
  /**
   * @description 砍价产品名称
   */
  storeName?: string;
  /**
   * @description 砍价活动名称
   */
  title?: string;
  /**
   * @description 单位名称
   */
  unitName?: string;
};
/**
 * @title YxStoreBargainUserHelpQueryVo对象
 * @description 砍价用户帮助表查询参数
 */
export type YxStoreBargainUserHelpQueryVo对象 = {
  /**
   */
  avatar?: string;
  /**
   * @description 砍价产品ID
   */
  bargainId?: int64;
  /**
   * @description 用户参与砍价表id
   */
  bargainUserId?: int64;
  /**
   * @description 砍价用户帮助表ID
   */
  id?: int64;
  /**
   */
  nickname?: string;
  /**
   * @description 帮助砍价多少金额
   */
  price?: number;
  /**
   * @description 帮助的用户id
   */
  uid?: int64;
};
/**
 * @title YxStoreBargainUserQueryVo对象
 * @description 用户参与砍价表查询参数
 */
export type YxStoreBargainUserQueryVo对象 = {
  /**
   * @description 砍价产品id
   */
  bargainId?: int64;
  /**
   * @description 砍价金额
   */
  bargainPrice?: number;
  /**
   * @description 砍价的最低价
   */
  bargainPriceMin?: number;
  /**
   */
  datatime?: datetime;
  /**
   * @description 用户参与砍价表ID
   */
  id?: int64;
  /**
   */
  image?: string;
  /**
   * @description 砍掉的价格
   */
  price?: number;
  /**
   */
  residuePrice?: double;
  /**
   * @description 状态 1参与中 2 活动结束参与失败 3活动结束参与成功
   */
  status?: int32;
  /**
   */
  title?: string;
  /**
   * @description 用户ID
   */
  uid?: int64;
};
/**
 * @title YxStoreCartQueryVo对象
 * @description 购物车表查询参数
 */
export type YxStoreCartQueryVo对象 = {
  /**
   * @description 砍价id
   */
  bargainId?: int64;
  /**
   * @description 商品数量
   */
  cartNum?: int32;
  /**
   * @description 拼团id
   */
  combinationId?: int64;
  /**
   * @description 成本价
   */
  costPrice?: double;
  /**
   * @description 购物车表ID
   */
  id?: int64;
  /**
   * @description 是否评价
   */
  isReply?: int32;
  /**
   * @description 商品属性
   */
  productAttrUnique?: string;
  /**
   * @description 商品ID
   */
  productId?: int64;
  /**
   * @description 商品信息
   */
  productInfo?: YxStoreProductQueryVo对象;
  /**
   * @description 秒杀产品ID
   */
  seckillId?: int64;
  /**
   * @description 真实价格
   */
  truePrice?: double;
  /**
   * @description 真实库存
   */
  trueStock?: int32;
  /**
   * @description 类型
   */
  type?: string;
  /**
   * @description 用户ID
   */
  uid?: int64;
  /**
   * @description 唯一id
   */
  unique?: string;
  /**
   * @description vip真实价格
   */
  vipTruePrice?: double;
};
/**
 * @title YxStoreCombinationQueryVo对象
 * @description 拼团产品表查询参数
 */
export type YxStoreCombinationQueryVo对象 = {
  /**
   * @description 浏览量
   */
  browse?: int32;
  /**
   */
  combination?: int32;
  /**
   * @description 拼团内容
   */
  description?: string;
  /**
   * @description 拼团订单有效时间
   */
  effectiveTime?: int32;
  /**
   */
  id?: int64;
  /**
   * @description 推荐图
   */
  image?: string;
  /**
   * @description 轮播图
   */
  images?: string;
  /**
   * @description 简介
   */
  info?: string;
  /**
   * @description 是否包邮1是0否
   */
  isPostage?: int32;
  /**
   */
  is_sub?: int32;
  /**
   * @description 商户id
   */
  merId?: int32;
  /**
   * @description 参团人数
   */
  people?: int32;
  /**
   * @description 邮费
   */
  postage?: number;
  /**
   * @description 价格
   */
  price?: number;
  /**
   * @description 商品id
   */
  productId?: int64;
  /**
   * @description 商品价格
   */
  productPrice?: number;
  /**
   * @description 销量
   */
  sales?: int32;
  /**
   */
  sliderImageArr?: Array<string>;
  /**
   * @description 库存
   */
  stock?: int32;
  /**
   * @description 活动标题
   */
  title?: string;
  /**
   * @description 单位名
   */
  unitName?: string;
};
/**
 * @title YxStoreCouponIssueQueryVo对象
 * @description 优惠券前台领取表查询参数
 */
export type YxStoreCouponIssueQueryVo对象 = {
  /**
   * @description 优惠券ID
   */
  cid?: int32;
  /**
   * @description 优惠券名称
   */
  cname?: string;
  /**
   * @description 优惠券价格
   */
  couponPrice?: double;
  /**
   * @description 优惠券类别
   */
  ctype?: int32;
  /**
   * @description 优惠券领取结束时间
   */
  endTime?: datetime;
  /**
   */
  id?: int32;
  /**
   * @description 是否无限张数
   */
  isPermanent?: int32;
  /**
   * @description 优惠券是否使用
   */
  isUse?: boolean;
  /**
   * @description 优惠券剩余领取数量
   */
  remainCount?: int32;
  /**
   * @description 优惠券领取开启时间
   */
  startTime?: datetime;
  /**
   * @description 1 正常 0 未开启 -1 已无效
   */
  status?: int32;
  /**
   * @description 优惠券领取数量
   */
  totalCount?: int32;
  /**
   * @description 优惠券最低满多少能使用
   */
  useMinPrice?: double;
};
/**
 * @title YxStoreCouponQueryParam对象
 * @description 优惠券表查询参数
 */
export type YxStoreCouponQueryParam对象 = {
  /**
   * @description 优惠券ID
   */
  couponId?: string;
  /**
   * @description 当前第几页
   */
  current?: int32;
  /**
   * @description 搜索字符串
   */
  keyword?: string;
  /**
   * @description 页大小,默认为10
   */
  limit?: int32;
  /**
   * @description 页码,默认为1
   */
  page?: int32;
  /**
   */
  size?: int32;
};
/**
 * @title YxStoreCouponUserQueryVo对象
 * @description 优惠券发放记录表查询参数
 */
export type YxStoreCouponUserQueryVo对象 = {
  /**
   * @description 优惠券发放显示文字
   */
  _msg?: string;
  /**
   * @description 优惠券发放类型 0可用 1不可用
   */
  _type?: int32;
  /**
   * @description 兑换的项目id
   */
  cid?: int32;
  /**
   * @description 优惠券的面值
   */
  couponPrice?: number;
  /**
   * @description 优惠券名称
   */
  couponTitle?: string;
  /**
   * @description 优惠券创建时间
   */
  createTime?: datetime;
  /**
   * @description 优惠券结束时间
   */
  endTime?: datetime;
  /**
   * @description 优惠券发放记录id
   */
  id?: int64;
  /**
   * @description 是否有效
   */
  isFail?: int32;
  /**
   * @description 状态（0：未使用，1：已使用, 2:已过期）
   */
  status?: int32;
  /**
   * @description 获取方式
   */
  type?: string;
  /**
   * @description 优惠券所属用户
   */
  uid?: int64;
  /**
   * @description 最低消费多少金额可用优惠券
   */
  useMinPrice?: number;
  /**
   * @description 使用时间
   */
  useTime?: datetime;
};
/**
 * @title YxStoreOrderQueryVo对象
 * @description 订单表查询参数
 */
export type YxStoreOrderQueryVo对象 = {
  /**
   */
  _status?: StatusDto;
  /**
   * @description 给用户退了多少积分
   */
  backIntegral?: number;
  /**
   * @description 砍价id
   */
  bargainId?: int64;
  /**
   * @description 购物车id
   */
  cartId?: string;
  /**
   */
  cartInfo?: Array<YxStoreCartQueryVo对象>;
  /**
   * @description 门店信息与二维码链接
   */
  code?: string;
  /**
   * @description 拼团产品id0一般产品
   */
  combinationId?: int64;
  /**
   * @description 成本价
   */
  cost?: number;
  /**
   * @description 优惠券id
   */
  couponId?: int32;
  /**
   * @description 优惠券金额
   */
  couponPrice?: number;
  /**
   * @description 创建时间
   */
  createTime?: datetime;
  /**
   * @description 抵扣金额
   */
  deductionPrice?: number;
  /**
   * @description 快递单号/手机号
   */
  deliveryId?: string;
  /**
   * @description 快递名称/送货人姓名
   */
  deliveryName?: string;
  /**
   */
  deliverySn?: string;
  /**
   * @description 发货类型
   */
  deliveryType?: string;
  /**
   */
  extendOrderId?: string;
  /**
   * @description 运费金额
   */
  freightPrice?: number;
  /**
   * @description 消费赚取积分
   */
  gainIntegral?: number;
  /**
   * @description 订单ID
   */
  id?: int64;
  /**
   * @description 支付渠道(0微信公众号1微信小程序)
   */
  isChannel?: int32;
  /**
   */
  isMerCheck?: int32;
  /**
   */
  isRemind?: int32;
  /**
   */
  isSystemDel?: int32;
  /**
   * @description 腾讯地图key
   */
  mapKey?: string;
  /**
   * @description 备注
   */
  mark?: string;
  /**
   * @description 商户ID
   */
  merId?: int32;
  /**
   * @description 订单号
   */
  orderId?: string;
  /**
   * @description 支付状态
   */
  paid?: int32;
  /**
   * @description 支付邮费
   */
  payPostage?: number;
  /**
   * @description 实际支付金额
   */
  payPrice?: number;
  /**
   * @description 支付时间
   */
  payTime?: datetime;
  /**
   * @description 支付方式
   */
  payType?: string;
  /**
   * @description 拼团id 0没有拼团
   */
  pinkId?: int64;
  /**
   * @description 用户姓名
   */
  realName?: string;
  /**
   * @description 退款金额
   */
  refundPrice?: number;
  /**
   * @description 不退款的理由
   */
  refundReason?: string;
  /**
   * @description 退款时间
   */
  refundReasonTime?: datetime;
  /**
   * @description 前台退款原因
   */
  refundReasonWap?: string;
  /**
   * @description 退款用户说明
   */
  refundReasonWapExplain?: string;
  /**
   * @description 退款图片
   */
  refundReasonWapImg?: string;
  /**
   * @description 0 未退款 1 申请中 2 已退款
   */
  refundStatus?: int32;
  /**
   * @description 管理员备注
   */
  remark?: string;
  /**
   * @description 秒杀产品ID
   */
  seckillId?: int64;
  /**
   * @description 配送方式 1=快递 ，2=门店自提
   */
  shippingType?: int32;
  /**
   * @description 订单状态（-1 : 申请退款 -2 : 退货成功 0：待发货；1：待收货；2：已收货；3：待评价；-1：已退款）
   */
  status?: int32;
  /**
   * @description 门店id
   */
  storeId?: int32;
  /**
   * @description 门店信息
   */
  systemStore?: YxSystemStoreQueryVo对象;
  /**
   * @description 订单商品总数
   */
  totalNum?: int32;
  /**
   * @description 邮费
   */
  totalPostage?: number;
  /**
   * @description 订单总价
   */
  totalPrice?: number;
  /**
   * @description 用户id
   */
  uid?: int64;
  /**
   * @description 唯一id(md5加密)类似id
   */
  unique?: string;
  /**
   * @description 使用积分
   */
  useIntegral?: number;
  /**
   * @description 详细地址
   */
  userAddress?: string;
  /**
   * @description 用户电话
   */
  userPhone?: string;
  /**
   * @description 核销码
   */
  verifyCode?: string;
};
/**
 * @title YxStorePinkQueryVo对象
 * @description 拼团表查询参数
 */
export type YxStorePinkQueryVo对象 = {
  /**
   * @description 用户头像
   */
  avatar?: string;
  /**
   * @description 拼团产品id
   */
  cid?: int64;
  /**
   * @description 开始时间
   */
  createTime?: datetime;
  /**
   */
  id?: int64;
  /**
   */
  kid?: int64;
  /**
   * @description 用户昵称
   */
  nickname?: string;
  /**
   * @description 订单id 生成
   */
  orderId?: string;
  /**
   * @description 订单id  数据库
   */
  orderIdKey?: int32;
  /**
   * @description 拼图总人数
   */
  people?: int32;
  /**
   * @description 产品id
   */
  pid?: int64;
  /**
   * @description 拼团产品单价
   */
  price?: number;
  /**
   * @description 状态1进行中2已完成3未完成
   */
  status?: int32;
  /**
   * @description 结束时间
   */
  stopTime?: datetime;
  /**
   * @description 购买商品个数
   */
  totalNum?: int32;
  /**
   * @description 购买总金额
   */
  totalPrice?: number;
  /**
   * @description 用户id
   */
  uid?: int64;
};
/**
 * @title YxStoreProductAttrQueryVo对象
 * @description 商品属性表查询参数
 */
export type YxStoreProductAttrQueryVo对象 = {
  /**
   * @description 属性名
   */
  attrName?: string;
  /**
   * @description 属性值集合
   */
  attrValue?: Array<AttrValueDto>;
  /**
   * @description 属性
   */
  attrValueArr?: Array<string>;
  /**
   * @description 属性值
   */
  attrValues?: string;
  /**
   */
  id?: int64;
  /**
   * @description 商品ID
   */
  productId?: int64;
};
/**
 * @title YxStoreProductAttrValue
 */
export type YxStoreProductAttrValue = {
  /**
   * @description 商品条码
   */
  barCode?: string;
  /**
   * @description 一级返佣
   */
  brokerage?: number;
  /**
   * @description 二级返佣
   */
  brokerageTwo?: number;
  /**
   * @description 成本价
   */
  cost?: number;
  /**
   */
  id?: int64;
  /**
   * @description 属性对应的图片
   */
  image?: string;
  /**
   * @description 原价
   */
  otPrice?: number;
  /**
   * @description 拼团属性对应的金额
   */
  pinkPrice?: number;
  /**
   * @description 拼团库存属性对应的库存
   */
  pinkStock?: int32;
  /**
   * @description 属性金额
   */
  price?: number;
  /**
   * @description 商品ID
   */
  productId?: int64;
  /**
   * @description 销量
   */
  sales?: int32;
  /**
   * @description 秒杀属性对应的金额
   */
  seckillPrice?: number;
  /**
   * @description 秒杀库存属性对应的库存
   */
  seckillStock?: int32;
  /**
   * @description 商品属性索引值 (attr_value|attr_value[|....])
   */
  sku?: string;
  /**
   * @description 属性对应的库存
   */
  stock?: int32;
  /**
   * @description 唯一值
   */
  unique?: string;
  /**
   * @description 体积
   */
  volume?: number;
  /**
   * @description 重量
   */
  weight?: number;
};
/**
 * @title YxStoreProductQueryVo对象
 * @description 商品表查询参数
 */
export type YxStoreProductQueryVo对象 = {
  /**
   */
  attrInfo?: YxStoreProductAttrValue;
  /**
   * @description 浏览量
   */
  browse?: int32;
  /**
   * @description 分类id
   */
  cateId?: string;
  /**
   */
  codeBase?: string;
  /**
   * @description 成本价
   */
  cost?: number;
  /**
   * @description 产品描述
   */
  description?: string;
  /**
   * @description 虚拟销量
   */
  ficti?: int32;
  /**
   * @description 获得积分
   */
  giveIntegral?: number;
  /**
   * @description 商品id
   */
  id?: int64;
  /**
   * @description 商品图片
   */
  image?: string;
  /**
   */
  image_base?: string;
  /**
   * @description 砍价状态 0未开启 1开启
   */
  isBargain?: int32;
  /**
   * @description 是否优品推荐
   */
  isGood?: int32;
  /**
   * @description 是否包邮
   */
  isPostage?: int32;
  /**
   * @description 秒杀状态 0 未开启 1已开启
   */
  isSeckill?: int32;
  /**
   * @description 状态（0：未上架，1：上架）
   */
  isShow?: int32;
  /**
   * @description 是否单独分佣
   */
  isSub?: int32;
  /**
   * @description 关键字
   */
  keyword?: string;
  /**
   * @description 商户Id(0为总后台管理员创建,不为0的时候是商户后台创建)
   */
  merId?: int32;
  /**
   * @description 市场价
   */
  otPrice?: number;
  /**
   * @description 邮费
   */
  postage?: number;
  /**
   * @description 商品价格
   */
  price?: number;
  /**
   * @description 销量
   */
  sales?: int32;
  /**
   * @description 轮播图，多个用,分割
   */
  sliderImage?: string;
  /**
   */
  sliderImageArr?: Array<string>;
  /**
   * @description 排序
   */
  sort?: int32;
  /**
   * @description 规格 0单 1多
   */
  specType?: int32;
  /**
   * @description 库存
   */
  stock?: int32;
  /**
   * @description 商品简介
   */
  storeInfo?: string;
  /**
   * @description 商品名称
   */
  storeName?: string;
  /**
   * @description 运费模板ID
   */
  tempId?: int32;
  /**
   * @description 单位名
   */
  unitName?: string;
  /**
   * @description 是否收藏
   */
  userCollect?: boolean;
  /**
   * @description 是否喜欢
   */
  userLike?: boolean;
  /**
   * @description 会员价格
   */
  vipPrice?: number;
};
/**
 * @title YxStoreProductRelationQueryVo对象
 * @description 商品点赞和收藏表查询参数
 */
export type YxStoreProductRelationQueryVo对象 = {
  /**
   * @description 某种类型的商品(普通商品、秒杀商品)
   */
  category?: string;
  /**
   * @description 添加时间
   */
  createTime?: datetime;
  /**
   */
  id?: int64;
  /**
   * @description 产品图片
   */
  image?: string;
  /**
   * @description 是否显示
   */
  isShow?: int32;
  /**
   * @description 原价
   */
  otPrice?: double;
  /**
   * @description 父ID
   */
  pid?: int32;
  /**
   * @description 产品价格
   */
  price?: double;
  /**
   * @description 商品ID
   */
  productId?: int64;
  /**
   * @description 产品销量
   */
  sales?: int32;
  /**
   * @description 商品名称
   */
  storeName?: string;
  /**
   * @description 类型(收藏(collect）、点赞(like))
   */
  type?: string;
  /**
   * @description 用户ID
   */
  uid?: int64;
};
/**
 * @title YxStoreProductReplyQueryVo对象
 * @description 评论表查询参数
 */
export type YxStoreProductReplyQueryVo对象 = {
  /**
   * @description 用户头像
   */
  avatar?: string;
  /**
   * @description 评论内容
   */
  comment?: string;
  /**
   */
  createTime?: datetime;
  /**
   * @description 评论ID
   */
  id?: int64;
  /**
   * @description 管理员回复内容
   */
  merchantReplyContent?: string;
  /**
   * @description 管理员回复时间
   */
  merchantReplyTime?: datetime;
  /**
   * @description 用户昵称
   */
  nickname?: string;
  /**
   * @description 评论图片
   */
  pics?: Array<string>;
  /**
   */
  pictures?: string;
  /**
   */
  picturesArr?: Array<string>;
  /**
   * @description 产品id
   */
  productId?: int64;
  /**
   * @description 商品分数
   */
  productScore?: int32;
  /**
   * @description 某种商品类型(普通商品、秒杀商品）
   */
  replyType?: string;
  /**
   * @description 服务分数
   */
  serviceScore?: int32;
  /**
   * @description 商品sku
   */
  sku?: string;
  /**
   * @description 评价星星数
   */
  star?: string;
};
/**
 * @title YxStoreSeckillQueryVo对象
 * @description 商品秒杀产品表查询参数
 */
export type YxStoreSeckillQueryVo对象 = {
  /**
   * @description 成本
   */
  cost?: number;
  /**
   * @description 内容
   */
  description?: string;
  /**
   * @description 返多少积分
   */
  giveIntegral?: number;
  /**
   * @description 商品秒杀产品表id
   */
  id?: int64;
  /**
   * @description 推荐图
   */
  image?: string;
  /**
   * @description 轮播图
   */
  images?: string;
  /**
   * @description 简介
   */
  info?: string;
  /**
   * @description 显示
   */
  isShow?: int32;
  /**
   */
  is_sub?: int32;
  /**
   * @description 最多秒杀几个
   */
  num?: int32;
  /**
   * @description 原价
   */
  otPrice?: number;
  /**
   * @description 百分比
   */
  percent?: int32;
  /**
   * @description 轮播图
   */
  pics?: Array<string>;
  /**
   * @description 邮费
   */
  postage?: number;
  /**
   * @description 价格
   */
  price?: number;
  /**
   * @description 商品id
   */
  productId?: int64;
  /**
   * @description 销量
   */
  sales?: int32;
  /**
   */
  sliderImageArr?: Array<string>;
  /**
   * @description 排序
   */
  sort?: int32;
  /**
   * @description 开始时间
   */
  startTime?: datetime;
  /**
   * @description 产品状态
   */
  status?: int32;
  /**
   * @description 库存
   */
  stock?: int32;
  /**
   * @description 结束时间
   */
  stopTime?: datetime;
  /**
   * @description 活动标题
   */
  title?: string;
  /**
   * @description 单位名
   */
  unitName?: string;
};
/**
 * @title YxSystemStoreQueryVo对象
 * @description 门店自提查询参数
 */
export type YxSystemStoreQueryVo对象 = {
  /**
   * @description 省市区
   */
  address?: string;
  /**
   * @description 每日营业开关时间
   */
  dayTime?: string;
  /**
   * @description 详细地址
   */
  detailedAddress?: string;
  /**
   * @description 距离
   */
  distance?: string;
  /**
   * @description 门店ID
   */
  id?: int32;
  /**
   * @description 门店logo
   */
  image?: string;
  /**
   * @description 简介
   */
  introduction?: string;
  /**
   * @description 纬度
   */
  latitude?: string;
  /**
   */
  latlng?: string;
  /**
   * @description 经度
   */
  longitude?: string;
  /**
   * @description 门店名称
   */
  name?: string;
  /**
   * @description 手机号码
   */
  phone?: string;
  /**
   * @description 核销有效日期
   */
  validTime?: string;
};
/**
 * @title YxUserAddressQueryVo对象
 * @description 用户地址表查询参数
 */
export type YxUserAddressQueryVo对象 = {
  /**
   * @description 收货人所在市
   */
  city?: string;
  /**
   * @description 收货人详细地址
   */
  detail?: string;
  /**
   * @description 收货人所在区
   */
  district?: string;
  /**
   * @description 用户地址id
   */
  id?: int64;
  /**
   * @description 是否默认
   */
  isDefault?: int32;
  /**
   * @description 纬度
   */
  latitude?: string;
  /**
   * @description 经度
   */
  longitude?: string;
  /**
   * @description 收货人电话
   */
  phone?: string;
  /**
   * @description 邮编
   */
  postCode?: int32;
  /**
   * @description 收货人所在省
   */
  province?: string;
  /**
   * @description 收货人姓名
   */
  realName?: string;
  /**
   * @description 用户id
   */
  uid?: int64;
};
/**
 * @title YxUserAddress对象
 * @description 用户地址表
 */
export type YxUserAddress对象 = {
  /**
   * @description 收货人所在市
   */
  city?: string;
  /**
   */
  cityId?: int32;
  /**
   */
  createTime?: datetime;
  /**
   * @description 收货人详细地址
   */
  detail?: string;
  /**
   * @description 收货人所在区
   */
  district?: string;
  /**
   * @description 用户地址id
   */
  id?: int64;
  /**
   * @description 是否默认
   */
  isDefault?: int32;
  /**
   * @description 纬度
   */
  latitude?: string;
  /**
   * @description 经度
   */
  longitude?: string;
  /**
   * @description 收货人电话
   */
  phone?: string;
  /**
   * @description 邮编
   */
  postCode?: string;
  /**
   * @description 收货人所在省
   */
  province?: string;
  /**
   * @description 收货人姓名
   */
  realName?: string;
  /**
   * @description 用户id
   */
  uid?: int64;
  /**
   */
  updateTime?: datetime;
};
/**
 * @title YxUserBillQueryParam对象
 * @description 用户账单表查询参数
 */
export type YxUserBillQueryParam对象 = {
  /**
   * @description 当前第几页
   */
  current?: int32;
  /**
   * @description 搜索字符串
   */
  keyword?: string;
  /**
   * @description 页大小,默认为10
   */
  limit?: int32;
  /**
   * @description 页码,默认为1
   */
  page?: int32;
  /**
   */
  size?: int32;
};
/**
 * @title YxUserBillQueryVo对象
 * @description 用户账单表查询参数
 */
export type YxUserBillQueryVo对象 = {
  /**
   * @description 添加时间
   */
  createTime?: datetime;
  /**
   * @description 用户账单id
   */
  id?: int64;
  /**
   * @description 备注
   */
  mark?: string;
  /**
   * @description 明细数字
   */
  number?: number;
  /**
   * @description 0 = 支出 1 = 获得
   */
  pm?: int32;
  /**
   * @description 账单标题
   */
  title?: string;
};
/**
 * @title YxUserQueryVo对象
 * @description 用户表查询参数
 */
export type YxUserQueryVo对象 = {
  /**
   * @description 用户账号
   */
  account?: string;
  /**
   * @description 添加ip
   */
  addIp?: string;
  /**
   * @description 详细地址
   */
  addres?: string;
  /**
   * @description 管理员编号
   */
  adminid?: int32;
  /**
   * @description 用户头像
   */
  avatar?: string;
  /**
   * @description 生日
   */
  birthday?: int32;
  /**
   * @description 佣金金额
   */
  brokeragePrice?: number;
  /**
   * @description 核销权限
   */
  checkStatus?: boolean;
  /**
   * @description 优惠券数量
   */
  couponCount?: int32;
  /**
   * @description 用户剩余积分
   */
  integral?: number;
  /**
   * @description 当天是否签到
   */
  isDaySign?: boolean;
  /**
   * @description 是否为推广员
   */
  isPromoter?: int32;
  /**
   * @description 昨天是否签到
   */
  isYesterDaySign?: boolean;
  /**
   * @description 最后一次登录ip
   */
  lastIp?: string;
  /**
   * @description 等级
   */
  level?: int32;
  /**
   * @description 用户登陆类型，h5,wechat,routine
   */
  loginType?: string;
  /**
   * @description 用户备注
   */
  mark?: string;
  /**
   * @description 用户昵称
   */
  nickname?: string;
  /**
   * @description 用户余额
   */
  nowMoney?: number;
  /**
   * @description 订单详情数据
   */
  orderStatusNum?: UserOrderCountVo;
  /**
   * @description 用户购买次数
   */
  payCount?: int32;
  /**
   * @description 手机号码
   */
  phone?: string;
  /**
   * @description 真实姓名
   */
  realName?: string;
  /**
   * @description 连续签到天数
   */
  signNum?: int32;
  /**
   * @description 下级人数
   */
  spreadCount?: int32;
  /**
   * @description 推广元id
   */
  spreadUid?: int64;
  /**
   */
  statu?: int32;
  /**
   * @description 1为正常，0为禁止
   */
  status?: boolean;
  /**
   * @description 总的签到天数
   */
  sumSignDay?: int32;
  /**
   * @description 用户id
   */
  uid?: int64;
  /**
   * @description 用户类型
   */
  userType?: string;
  /**
   * @description 用户账户(跟accout一样)
   */
  username?: string;
  /**
   * @description 是否会员
   */
  vip?: boolean;
  /**
   * @description 会员图标
   */
  vipIcon?: string;
  /**
   * @description 会员ID
   */
  vipId?: int32;
  /**
   * @description 会员名称
   */
  vipName?: string;
};
/**
 * @title YxWechatLiveDto
 */
export type YxWechatLiveDto = {
  /**
   * @description 主播头像
   */
  anchorImge?: string;
  /**
   * @description 主播昵称
   */
  anchorName?: string;
  /**
   * @description 主播微信号
   */
  anchorWechat?: string;
  /**
   * @description 是否关闭评论 【0：开启，1：关闭】
   */
  closeComment?: int32;
  /**
   * @description 是否关闭货架 【0：开启，1：关闭】
   */
  closeGoods?: int32;
  /**
   */
  closeKf?: int32;
  /**
   * @description 是否关闭点赞 【0：开启，1：关闭】
   */
  closeLike?: int32;
  /**
   */
  closeReplay?: int32;
  /**
   */
  closeShare?: int32;
  /**
   * @description 背景图
   */
  coverImge?: string;
  /**
   * @description 预计结束时间
   */
  endTime?: int64;
  /**
   */
  id?: int64;
  /**
   * @description 直播间状态  101：直播中，102：未开始，103 已结束，104 禁播，105：暂停，106：异常，107：已过期
   */
  liveStatus?: int32;
  /**
   * @description 直播间标题
   */
  name?: string;
  /**
   * @description 商品信息
   */
  product?: Array<YxWechatLiveGoodsDto>;
  /**
   */
  productId?: string;
  /**
   * @description 直播间id
   */
  roomId?: int64;
  /**
   * @description 横屏、竖屏 【1：横屏，0：竖屏】
   */
  screenType?: int32;
  /**
   * @description 分享图片
   */
  shareImge?: string;
  /**
   * @description 开始时间
   */
  startTime?: int64;
  /**
   * @description 直播间类型 1：推流 0：手机直播
   */
  type?: int32;
};
/**
 * @title YxWechatLiveGoodsDto
 */
export type YxWechatLiveGoodsDto = {
  /**
   */
  auditId?: int64;
  /**
   */
  auditStatus?: int32;
  /**
   */
  coverImgeUrl?: string;
  /**
   */
  goodsId?: int64;
  /**
   */
  id?: int64;
  /**
   */
  name?: string;
  /**
   */
  price?: string;
  /**
   */
  price2?: string;
  /**
   */
  priceType?: string;
  /**
   */
  productId?: int64;
  /**
   */
  thirdPartyTag?: string;
  /**
   */
  url?: string;
};
/**
 * @title 查询参数对象
 */
export type 查询参数对象 = {
  /**
   * @description 某种类型的商品(普通商品、秒杀商品)
   */
  category?: string;
  /**
   * @description 商品id
   */
  id: string;
};
/**
 * @title 用户参与砍价表查询参数
 * @description 用户参与砍价表查询参数
 */
export type 用户参与砍价表查询参数 = {
  /**
   * @description 砍价产品ID
   */
  bargainId?: string;
  /**
   * @description 砍价用户ID
   */
  bargainUserUid?: string;
  /**
   * @description 当前第几页
   */
  current?: int32;
  /**
   * @description 搜索字符串
   */
  keyword?: string;
  /**
   * @description 页大小,默认为10
   */
  limit?: int32;
  /**
   * @description 页码,默认为1
   */
  page?: int32;
  /**
   */
  size?: int32;
};
/**
 * @title 砍价用户帮助表查询参数
 * @description 砍价用户帮助表查询参数
 */
export type 砍价用户帮助表查询参数 = {
  /**
   * @description 砍价产品ID
   */
  bargainId?: string;
  /**
   * @description 砍价用户id
   */
  bargainUserUid?: string;
  /**
   * @description 当前第几页
   */
  current?: int32;
  /**
   * @description 搜索字符串
   */
  keyword?: string;
  /**
   * @description 页大小,默认为10
   */
  limit?: int32;
  /**
   * @description 页码,默认为1
   */
  page?: int32;
  /**
   */
  size?: int32;
};
/**
 * @title 首页数据
 */
export type 首页数据 = {
  /**
   * @description banner
   */
  banner?: Array<JSONObject>;
  /**
   * @description 精品推荐
   */
  bastList?: Array<YxStoreProductQueryVo对象>;
  /**
   * @description 猜你喜欢
   */
  benefit?: Array<YxStoreProductQueryVo对象>;
  /**
   * @description 精品推荐->拼团
   */
  combinationList?: Array<YxStoreCombinationQueryVo对象>;
  /**
   * @description 首发新品
   */
  firstList?: Array<YxStoreProductQueryVo对象>;
  /**
   * @description 热门榜单
   */
  likeInfo?: Array<YxStoreProductQueryVo对象>;
  /**
   * @description 直播间
   */
  liveList?: Array<YxWechatLiveDto>;
  /**
   * @description 地图key
   */
  mapKey?: string;
  /**
   * @description 首页按钮
   */
  menus?: Array<JSONObject>;
  /**
   * @description 滚动
   */
  roll?: Array<JSONObject>;
  /**
   * @description 首发新品->秒杀
   */
  seckillList?: Array<YxStoreSeckillQueryVo对象>;
};
/**
 * @title ApiResult
 */
export type ApiResult<T = any> = {
  /**
   * @description 响应数据
   */
  data?: T;
  /**
   * @description 响应消息
   */
  msg?: string;
  /**
   * @description 响应码
   */
  status?: int32;
  /**
   * @description 是否成功：成功true，失败false
   */
  success?: boolean;
  /**
   * @description 响应时间
   */
  time?: datetime;
};
