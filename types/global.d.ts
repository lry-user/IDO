interface GlobalResponse<T> {
  msg: string;
  data: T;
  code: number;
  message: string;
  success: boolean;
}

interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  expires: number;
}

interface JcLoginResponse {
  // For existing users
  user?: {
    id: string;
    email: string;
    first_name: string;
    status: string;
  };
  accessToken?: string;
  refreshToken?: string;
  expires?: number;
  is_new_user: boolean;

  // For new users
  openId?: string;
  nickName?: string;
}

interface JcAuthResponse {
  accessToken: string;
  refreshToken: string;
  expires: number;
  invite_code?: string;
}

interface UserInfoResponse {
  id: string;
  first_name: string;
  email: string;
  invite_code: string;
  avatar: string;
  promoter: {
    id: string;
    first_name: string;
    avatar: string;
    email: string;
  };
  jc_openid: string;
  team_count: number;
}

interface RegisterRequest {
  /**
   * 邮箱验证码
   */
  code: string;
  /**
   * 邮箱
   */
  email: string;
  /**
   * 邀请码
   */
  invite_code: string;
  /**
   * 密码
   */
  password: string;
}

interface IDOInfoResponse {
  /**
   * 当前天数索引(-1表示未开始)
   */
  current?: number;
  /**
   * 结束时间
   */
  end_time?: string;
  /**
   * 能量比率
   */
  energy_rate?: number;
  /**
   * IDO期数ID
   */
  id?: string;
  /**
   * 每日配置列表
   */
  list: Array<{
    /**
     * 每日限额
     */
    daily_limit?: number;
    /**
     * 日期
     */
    date?: string;
    /**
     * 第几天
     */
    day_number?: number;
    /**
     * 配置ID
     */
    id?: string;
    /**
     * 当日参与人数
     */
    stats_participant_count?: number;
    /**
     * 当日已购买总额
     */
    stats_total_amount?: number;
    /**
     * 当日已产生能量
     */
    stats_total_energy?: number;
    /**
     * 当日交易笔数
     */
    stats_transaction_count?: number;
    /**
     * 当日完成时间
     */
    stats_complete_time?: string;
    /**
     * 当日持续时间(秒)
     */
    stats_duration_seconds?: number;
    /**
     * 开始时间
     */
    start_time?: string;
    /**
     * 结束时间
     */
    end_time?: string;
  }>;
  /**
   * IDO期数名称
   */
  name?: string;
  /**
   * 开始时间
   */
  start_time?: string;
  /**
   * 代币比率
   */
  token_rate?: number;
  /**
   * IDO总额度
   */
  total_amount?: number;
  /**
   * 用户已购买金额(登录后返回)
   */
  user_purchase_amount?: number;
  /**
   * 用户已产生能量(登录后返回)
   */
  user_energy_amount?: number;
  /**
   * 用户购买限额
   */
  user_purchase_limit?: number;
}

interface WalletInfoResponse {
  id: number;
  date_created: string;
  date_updated: string;
  user_id: string;
  accountKey: string;
  active_coin_key: string;
  address: string;
  balance: number;
  available_balance: number;
  frozen_balance: number;
  coinName: string;
  coinSymbol: string;
  logoUrl: string;
  assetList: Array<{
    coinKey: string;
    coinName: string;
    coinSymbol: string;
    logoUrl: string;
    balance: number;
    available_balance: number;
    frozen_balance: number;
  }>;
  is_payment_password_set: boolean;
}

interface RecordResponse {
  rows: Array<{
    id: string;
    code: string;
    type: string;
    amount: number;
    fee: number;
    coin_key: string;
    to_address: string;
    tx_hash: string;
    status: "pending" | "success" | "failed";
    date_created: string;
  }>;
  total: number;
  page: number;
  limit: number;
  total_pages: number;
}

interface TeamPerformanceResponse {
  /**
   * A区业绩
   */
  a_line_amount?: number;
  /**
   * B区是否激活
   */
  b_line_activated?: boolean;
  /**
   * B区业绩
   */
  b_line_amount?: number;
  /**
   * 直推人数
   */
  direct_count?: number;
  /**
   * 间推人数
   */
  indirect_count?: number;
  /**
   * 团队总人数
   */
  team_count?: number;
  /**
   * 直推总业绩
   */
  total_direct_amount?: number;
  /**
   * 团队总业绩
   */
  total_team_amount?: number;
}

interface PageResponse<T> {
  limit?: number;
  page?: number;
  rows?: T[];
  total_count?: number;
  total_pages?: number;
}

interface TeamMember {
  id: string;
  first_name: string;
  email: string;
  date_created: string;
  line_type: string;
  team_count: number;
  total_team_amount: number;
  last_24h_amount: number;
  last_24h_count: number;
  children: TeamMember[];
}

interface OrderResponse {
  rows: Array<{
    /**
     * 购买金额
     */
    amount?: number;
    /**
     * 购买日期
     */
    date?: string;
    /**
     * 创建时间
     */
    date_created?: string;
    /**
     * 第几天
     */
    day_number?: number;
    /**
     * 获得能量
     */
    energy_amount?: number;
    /**
     * 订单ID
     */
    id?: string;
    /**
     * IDO期数ID
     */
    phase_id?: string;
    /**
     * IDO期数名称
     */
    phase_name?: string;
    /**
     * 订单状态
     */
    status?: "success" | "failed";
  }>;
  total: number;
  page: number;
  limit: number;
  total_pages: number;
}

interface RewardMiningResponse {
  limit?: number;
  list: Array<{
    date_created?: string;
    id?: string;
    mining_date?: string;
    network_power?: number;
    /**
     * 奖励额
     */
    reward_amount?: number;
    user_power?: number;
  }>;
  page?: number;
  stats?: {
    today_amount?: number;
    total_amount?: number;
  };
  total?: number;
}

interface RewardPromotionResponse {
  list: Array<{
    id: string;
    amount: number;
    reward_type: string;
    reward_rate: number;
    line_type: string;
    date_created: string;
    source_user: {
      id: string;
      avatar: string;
      email: string;
    };
    node: {
      id: string;
      code: string;
    };
  }>;
  total: number;
  page: number;
  limit: number;
  stats: {
    today_amount: number;
    total_amount: number;
  };
}

interface AppConfigResponse {
  min_withdrawal_amount: number;
  max_withdrawal_amount: number;
  withdrawal_fee_rate: number;
  min_withdrawal_amount_hi: number;
  max_withdrawal_amount_hi: number;
  withdrawal_fee_rate_hi: number;
  active_coin_key: Array<string>;
  feedback_url: string;
  reward_claim_fee_rate: number;
  ju_coin_appid: string;
}

interface PostResponse {
  limit?: number;
  page?: number;
  total_count?: number;
  total_pages?: number;
  rows: Array<{
    content?: string;
    date_created?: string;
    id?: string;
    status?: string;
    title?: string;
    type?: string;
  }>;
}

interface IEOInfoResponse {
  /**
   * 结束时间
   */
  end_time?: string;
  /**
   * IEO项目ID
   */
  id?: string;
  /**
   * 最大认购金额
   */
  max_purchase_amount?: number;
  /**
   * 最小认购金额
   */
  min_purchase_amount?: number;
  /**
   * IEO项目名称
   */
  name?: string;
  /**
   * IEO价格
   */
  price?: number;
  /**
   * 募资目标金额
   */
  raise_target_amount?: number;
  /**
   * 已募资总额
   */
  raise_total_amount?: number;
  /**
   * 开始时间
   */
  start_time?: string;
  /**
   * 项目状态
   */
  status?: Status;
  /**
   * 代币符号
   */
  symbol?: string;
  /**
   * 代币分发总量
   */
  total_supply?: number;
  /**
   * 用户已认购金额(登录后返回)
   */
  user_purchase_amount?: number;
}

interface FinanceProductResponse {
  /**
   * 全球参与总量（质押中/已销毁）
   */
  global_amount?: number;
  rows: Array<{
    /**
     * 产品ID
     */
    id?: number;
    /**
     * 最高收益倍数（销毁为4）
     */
    max_ratio?: number;
    /**
     * 最小参与金额
     */
    min_amount?: number;
    /**
     * 产品名称
     */
    name?: string;
    /**
     * 参与人数
     */
    participant_count?: number;
    /**
     * 是否启用
     */
    status?: boolean;
    /**
     * 产品类型：销毁/质押
     */
    type?: "BURN" | "STAKE";
    /**
     * 锁仓天数
     */
    lock_days?: number;
    /**
     * 年化率
     */
    year_rate?: number;
  }>;
}

interface PendingRecord {
  /**
   * 收益金额
   */
  amount?: string;
  /**
   * 收益日期
   */
  date?: Date;
  /**
   * 收益记录ID
   */
  id?: number;
}

interface PersonalEarningsResponse {
  burn?: {
    /**
     * 已领取收益
     */
    claimed_amount?: string;
    /**
     * 预期销毁总收益
     */
    expected_total?: string;
    /**
     * 待领取收益
     */
    pending_amount?: string;
    /**
     * 待领取收益记录
     */
    pending_records?: PendingRecord[];
    /**
     * 已销毁数量
     */
    total_amount?: string;
  };
  stake?: {
    /**
     * 已领取收益
     */
    claimed_amount?: string;
    /**
     * 预期质押总收益
     */
    expected_total?: string;
    /**
     * 待领取收益
     */
    pending_amount?: string;
    /**
     * 待领取收益记录
     */
    pending_records?: PendingRecord[];
    /**
     * 质押中数量
     */
    staking_amount?: string;
  };
}

interface TeamEarningsResponse {
  /**
   * 已领取总收益
   */
  claimed_amount?: string;
  /**
   * 个人已领取销毁收益
   */
  own_claimed_amount?: string;
  direct?: {
    /**
     * 已领取直推收益
     */
    claimed_amount?: string;
    /**
     * 直推人数
     */
    count?: number;
    /**
     * 待领取直推收益
     */
    pending_amount?: string;
    /**
     * 待领取收益记录
     */
    pending_records?: PendingRecord[];
    /**
     * 直推收益率
     */
    reward_rate?: number;
  };
  /**
   * 预期销毁总收益
   */
  expected_total?: string;
  team?: {
    /**
     * 已领取团队收益
     */
    claimed_amount?: string;
    /**
     * 团队人数
     */
    count?: number;
    /**
     * 用户等级
     */
    level?: number;
    /**
     * 待领取团队收益
     */
    pending_amount?: string;
    /**
     * 待领取收益记录
     */
    pending_records?: PendingRecord[];
  };
}

interface DirectPendingRecord {
  /**
   * 收益金额
   */
  amount?: string;
  /**
   * 收益日期
   */
  date?: Date;
  /**
   * 收益记录ID
   */
  id?: number;
}

interface StakeBurnOrderResponse {
  rows: Array<{
    amount: number;
    date_created: string;
    date_updated: string;
    end_time: string;
    id: number;
    product_type: string;
    redeemed_time: string;
    start_time: string;
    status: string;
    user_id: string;
    product_id: {
      coin_key: string;
      date_created: string;
      date_updated: string;
      id: number;
      lock_days: number;
      max_ratio: string;
      min_amount: string;
      name: string;
      status: string;
      type: string;
      year_rate: string;
    };
  }>;
  total_count: number;
  page: number;
  limit: number;
  total_pages: number;
}

interface TeamTreeResponse {
  /**
   * 团队成员总数
   */
  total_count?: number;
  /**
   * 团队树形结构
   */
  tree?: TeamMember[];
}

/**
 * TeamMember
 */
interface TeamMember {
  /**
   * 下级成员列表
   */
  children?: TeamMember[];
  /**
   * 直推人数
   */
  direct_count?: number;
  /**
   * 用户邮箱
   */
  email?: string;
  /**
   * 用户ID
   */
  id?: string;
  /**
   * 在团队中的层级(1-6)
   */
  level?: number;
  /**
   * 个人销毁数量
   */
  own_burn_amount?: number;
  /**
   * 上级用户ID
   */
  parent_id?: string;
  /**
   * 注册时间
   */
  register_time?: Date;
  /**
   * 团队总人数
   */
  team_count?: number;
  /**
   * 团队等级
   */
  team_level?: number;
}

// 个人收益记录
interface PersonalEarningsRecordResponse {
  /**
   * 每页条数
   */
  limit?: number;
  /**
   * 当前页码
   */
  page?: number;
  rows?: Array<{
    /**
     * 收益金额
     */
    amount?: number;
    /**
     * 收益日期
     */
    date?: Date;
    /**
     * 收益类型
     */
    earning_type?: string;
    /**
     * 订单数量
     */
    order_count?: number;
    // 领取时间
    claimed_date?: Date;
  }>;
  /**
   * 总记录数
   */
  total?: number;
}

// 团队收益记录
interface TeamEarningsRecordResponse {
  /**
   * 每页条数
   */
  limit?: number;
  /**
   * 当前页码
   */
  page?: number;
  rows?: Array<{
    /**
     * 收益金额
     */
    amount?: number;
    /**
     * 基础金额
     */
    base_amount?: number;
    /**
     * 收益日期
     */
    earning_date?: Date;
    /**
     * 收益类型
     */
    earning_type?: string;
    // 领取时间
    claimed_date?: Date;
    source_user?: {
      /**
       * 来源用户邮箱
       */
      email?: string;
      /**
       * 来源用户ID
       */
      id?: string;
      /**
       * 用户等级
       */
      level?: number;
    };
  }>;
  /**
   * 总记录数
   */
  total?: number;
}

// 个人销毁直推收益记录
interface PersonalBurnRecordResponse {
  /**
   * 每页条数
   */
  limit?: number;
  /**
   * 当前页码
   */
  page?: number;
  rows?: Array<{
    /**
     * 收益金额
     */
    amount?: number;
    /**
     * 基础金额
     */
    base_amount?: number;
    /**
     * 创建时间
     */
    date_created?: Date;
    /**
     * 收益日期
     */
    earning_date?: Date;
    /**
     * 收益类型
     */
    earning_type?: string;
    /**
     * 奖励比率
     */
    reward_rate?: number;
    source_user?: {
      /**
       * 来源用户邮箱
       */
      email?: string;
      /**
       * 来源用户ID
       */
      id?: string;
    };
    /**
     * 状态
     */
    status?: string;
  }>;
  /**
   * 总记录数
   */
  total?: number;
}

type CarouselResponse = Array<{
  /**
   * 轮播图ID
   */
  id?: number;
  /**
   * 轮播图标题
   */
  title?: string;
  /**
   * 轮播图图片
   */
  img?: string;
  /**
   * 轮播图链接
   */
  link?: string;
}>;
