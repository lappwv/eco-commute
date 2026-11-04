export type Role = 'ROLE_USER' | 'ROLE_ADMIN';

export type TransportMode =
  | 'BICYCLE'
  | 'WALKING'
  | 'ELECTRIC_SCOOTER'
  | 'PUBLIC_TRANSIT'
  | 'CARPOOL'
  | 'CAR_SOLO';

export interface AuthResponse {
  token: string;
  tokenType: string;
  id: string;
  email: string;
  fullName: string;
  avatarUrl: string;
  role: Role;
  currentPoints: number;
  currentLevel: number;
  streakDays: number;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  fullName: string;
  hasBicycle?: boolean;
  maxWalkingMinutes?: number;
}

export interface BadgeAward {
  id: number;
  code: string;
  title: string;
  description: string;
  iconEmoji: string;
  awardedAt: string | null;
}

export interface UserProfile {
  id: string;
  email: string;
  fullName: string;
  avatarUrl: string;
  role: Role;
  currentPoints: number;
  currentLevel: number;
  streakDays: number;
  hasBicycle: boolean;
  maxWalkingMinutes: number;
  totalCo2SavedKg: number;
  totalDistanceKm: number;
  totalTrips: number;
  totalCaloriesBurned: number;
  treesEquivalent: number;
  badges: BadgeAward[];
}

export interface CoordinateRequest {
  latitude: number;
  longitude: number;
}

export interface RoutePlanRequest {
  origin: CoordinateRequest;
  destination: CoordinateRequest;
  selectedProfile: 'BICYCLE' | 'WALKING' | 'CAR';
  enableAiOptimization: boolean;
}

export interface AiInsight {
  greenScore: number;
  safetyRating: number;
  shadeTreeCoveragePercent: number;
  cyclingInfrastructureQuality: string;
  healthBenefitSummary: string;
  treesEquivalentFraction: number;
  ecoReasoning: string;
}

export interface RouteOption {
  id: string;
  title: string;
  mode: TransportMode;
  modeDisplayName: string;
  distanceKm: number;
  durationMinutes: number;
  co2EmittedGrams: number;
  co2SavedGrams: number;
  potentialPoints: number;
  caloriesBurned: number;
  isAiRecommended: boolean;
  aiInsight: AiInsight | null;
  pathCoordinates: number[][];
  summary: string;
}

export interface RoutePlanResponse {
  baselineCarRoute: RouteOption;
  standardProfileRoute: RouteOption;
  aiGreenCorridorRoute: RouteOption;
  recommendedRouteId: string;
}

export interface TripRequest {
  transportMode: TransportMode;
  originName: string;
  originLat: number;
  originLng: number;
  destinationName: string;
  destinationLat: number;
  destinationLng: number;
  distanceKm: number;
  durationMinutes: number;
}

export interface TripResponse {
  id: string;
  transportMode: TransportMode;
  modeDisplayName: string;
  originName: string;
  originLat: number;
  originLng: number;
  destinationName: string;
  destinationLat: number;
  destinationLng: number;
  distanceKm: number;
  durationMinutes: number;
  baselineCo2Grams: number;
  co2EmittedGrams: number;
  co2SavedGrams: number;
  caloriesBurned: number;
  pointsEarned: number;
  suspicious: boolean;
  suspiciousReason: string | null;
  completedAt: string;
}

export interface PageResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  number: number;
  size: number;
}

export interface WeeklyTrendPoint {
  dayOfWeek: string;
  co2SavedGrams: number;
}

export interface DashboardBadge {
  id: number;
  code: string;
  title: string;
  description: string;
  iconEmoji: string;
  unlocked: boolean;
  progressPercent: number;
}

export interface DashboardSummary {
  userId: string;
  fullName: string;
  email: string;
  avatarUrl: string;
  totalCo2SavedKg: number;
  totalDistanceKm: number;
  totalTrips: number;
  currentPoints: number;
  currentLevel: number;
  totalCaloriesBurned: number;
  treesEquivalent: number;
  weeklyTrend: WeeklyTrendPoint[];
  tripsByMode: Record<string, number>;
  recentBadges: DashboardBadge[];
}

export interface CommunityImpact {
  totalCo2SavedTons: number;
  totalCleanKm: number;
  totalTrips: number;
  totalActiveUsers: number;
  totalTreesEquivalent: number;
}

export interface AiRecommendation {
  title: string;
  recommendation: string;
  advisor: string;
}

export interface GamificationStats {
  currentPoints: number;
  totalCo2SavedKg: number;
  totalDistanceKm: number;
  streakDays: number;
  totalTrips: number;
}

export interface GamificationMilestones {
  currentLevel: number;
  currentPoints: number;
  nextMilestonePoints: number;
  progressPercentage: number;
}

export interface BadgeCatalogItem {
  id: number;
  code: string;
  title: string;
  description: string;
  iconEmoji: string;
  requiredPoints: number;
  requiredCo2SavedKg: number;
  requiredStreakDays: number;
  requiredTrips: number;
}

export interface LeaderboardEntry {
  userId: string;
  fullName: string;
  avatarUrl: string;
  district: string;
  totalCo2SavedKg: number;
  currentPoints: number;
  tripsCount: number;
  streakDays: number;
  rank: number;
}

export interface DistrictsSummary {
  activeDistrictsCount: number;
  activeDistricts: string[];
  totalRankedUsers: number;
}

export interface RewardItem {
  id: number;
  code: string;
  title: string;
  description: string;
  pointsCost: number;
  iconEmoji: string;
  iconUrl?: string;
  active: boolean;
}

export interface RewardRequest {
  code: string;
  title: string;
  description: string;
  pointsCost: number;
  iconEmoji: string;
  iconUrl?: string;
  active: boolean;
}

export interface RedemptionItem {
  id: number;
  rewardCode: string;
  rewardTitle: string;
  rewardIconEmoji: string;
  pointsUsed: number;
  status: string;
  createdAt: string;
}

export interface RedeemResponse {
  redemption: RedemptionItem;
}

export interface ChallengeItem {
  id: number;
  title: string;
  description: string;
  goalValue: number;
  goalUnit: string;
  periodStart: string;
  periodEnd: string;
  active: boolean;
}

export interface ChallengeRequest {
  title: string;
  description: string;
  goalValue: number;
  goalUnit: string;
  periodStart: string;
  periodEnd: string;
  active: boolean;
}
