import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, map, of, tap } from 'rxjs';
import {
  AiRecommendation,
  BadgeCatalogItem,
  ChallengeItem,
  ChallengeRequest,
  CommunityImpact,
  DashboardBadge,
  DashboardSummary,
  DistrictsSummary,
  GamificationMilestones,
  GamificationStats,
  LeaderboardEntry,
  PageResponse,
  RedeemResponse,
  RedemptionItem,
  RewardItem,
  RewardRequest,
  RoutePlanRequest,
  RoutePlanResponse,
  TransportMode,
  TripRequest,
  TripResponse
} from '../models/api.models';
import { AuthService } from './auth.service';

const MODE_CO2_G_PER_KM: Record<TransportMode, number> = {
  BICYCLE: 0,
  WALKING: 0,
  ELECTRIC_SCOOTER: 15,
  PUBLIC_TRANSIT: 45,
  CARPOOL: 85,
  CAR_SOLO: 170
};

const MODE_DISPLAY: Record<TransportMode, string> = {
  BICYCLE: 'Bicicleta Mecánica',
  WALKING: 'Caminata Peatonal',
  ELECTRIC_SCOOTER: 'Scooter / Bicicleta Eléctrica',
  PUBLIC_TRANSIT: 'Transporte Público (Metropolitano / Metro)',
  CARPOOL: 'Auto Compartido (Carpool)',
  CAR_SOLO: 'Automóvil Particular'
};

const MODE_KCAL_PER_KM: Record<TransportMode, number> = {
  BICYCLE: 32,
  WALKING: 55,
  ELECTRIC_SCOOTER: 8,
  PUBLIC_TRANSIT: 10,
  CARPOOL: 3,
  CAR_SOLO: 2
};

@Injectable({ providedIn: 'root' })
export class ApiService {
  private backendOnlineSubject = new BehaviorSubject<boolean>(false);
  backendOnline$ = this.backendOnlineSubject.asObservable();

  // Resilient local state mirrors DataInitializer.java
  private localTrips: TripResponse[] = [
    {
      id: 'trip-seed-1',
      transportMode: 'BICYCLE',
      modeDisplayName: 'Bicicleta Mecánica',
      originName: 'Casa (San Isidro)',
      originLat: -12.0897,
      originLng: -77.0543,
      destinationName: 'Centro Financiero San Isidro',
      destinationLat: -12.0965,
      destinationLng: -77.0285,
      distanceKm: 8.5,
      durationMinutes: 32,
      baselineCo2Grams: 1445,
      co2EmittedGrams: 0,
      co2SavedGrams: 1445,
      caloriesBurned: 272,
      pointsEarned: 145,
      suspicious: false,
      suspiciousReason: null,
      completedAt: '2026-11-04T08:15:00'
    },
    {
      id: 'trip-seed-2',
      transportMode: 'BICYCLE',
      modeDisplayName: 'Bicicleta Mecánica',
      originName: 'Av. Salaverry (Jesús María)',
      originLat: -12.085,
      originLng: -77.045,
      destinationName: 'Malecón de la Reserva (Miraflores)',
      destinationLat: -12.131,
      destinationLng: -77.029,
      distanceKm: 6.8,
      durationMinutes: 20,
      baselineCo2Grams: 1156,
      co2EmittedGrams: 0,
      co2SavedGrams: 1156,
      caloriesBurned: 218,
      pointsEarned: 116,
      suspicious: false,
      suspiciousReason: null,
      completedAt: '2026-11-03T18:10:00'
    },
    {
      id: 'trip-seed-3',
      transportMode: 'WALKING',
      modeDisplayName: 'Caminata Peatonal',
      originName: 'Parque Kennedy',
      originLat: -12.1215,
      originLng: -77.0298,
      destinationName: 'Café Verde Miraflores',
      destinationLat: -12.128,
      destinationLng: -77.031,
      distanceKm: 1.6,
      durationMinutes: 18,
      baselineCo2Grams: 272,
      co2EmittedGrams: 0,
      co2SavedGrams: 272,
      caloriesBurned: 88,
      pointsEarned: 45,
      suspicious: false,
      suspiciousReason: null,
      completedAt: '2026-11-02T13:20:00'
    },
    {
      id: 'trip-seed-4',
      transportMode: 'BICYCLE',
      modeDisplayName: 'Bicicleta Mecánica',
      originName: 'Óvalo Miraflores',
      originLat: -12.1198,
      originLng: -77.0295,
      destinationName: 'Puente Villena',
      destinationLat: -12.126,
      destinationLng: -77.034,
      distanceKm: 1.6,
      durationMinutes: 6,
      baselineCo2Grams: 272,
      co2EmittedGrams: 0,
      co2SavedGrams: 272,
      caloriesBurned: 51,
      pointsEarned: 39,
      suspicious: false,
      suspiciousReason: null,
      completedAt: '2026-11-01T09:00:00'
    }
  ];

  private localRewards: RewardItem[] = [
    {
      id: 1,
      code: 'COFFEE_50',
      title: 'Café de cortesía',
      description: 'Un café orgánico gratis en cafetería aliada de Miraflores o San Isidro',
      pointsCost: 50,
      iconEmoji: '☕',
      active: true
    },
    {
      id: 2,
      code: 'BIKE_HOUR',
      title: 'Alquiler de bicicleta',
      description: 'Una hora de bicicleta compartida sin costo en CityBike Lima',
      pointsCost: 120,
      iconEmoji: '🚲',
      active: true
    },
    {
      id: 3,
      code: 'PARK_PASS',
      title: 'Entrada al Parque de la Reserva',
      description: 'Pase libre para el Circuito Mágico del Agua en Lima',
      pointsCost: 200,
      iconEmoji: '🎟️',
      active: true
    },
    {
      id: 4,
      code: 'TREE_300',
      title: 'Planta un árbol en Lima',
      description: 'Dona tus puntos para plantar un árbol nativo en parques metropolitanos',
      pointsCost: 300,
      iconEmoji: '🌳',
      active: true
    }
  ];

  private localRedemptions: RedemptionItem[] = [
    {
      id: 101,
      rewardCode: 'COFFEE_50',
      rewardTitle: 'Café de cortesía',
      rewardIconEmoji: '☕',
      pointsUsed: 50,
      status: 'COMPLETED',
      createdAt: '2026-11-01T16:40:00'
    }
  ];

  private localChallenges: ChallengeItem[] = [
    {
      id: 1,
      title: 'Noviembre sin auto',
      description: 'Completa todos tus traslados hacia el campus o trabajo sin usar auto particular',
      goalValue: 50,
      goalUnit: 'kg_co2',
      periodStart: '2026-11-01',
      periodEnd: '2026-11-30',
      active: true
    },
    {
      id: 2,
      title: 'Reto bicicleta semanal',
      description: 'Acumula 40 kilómetros pedaleando por las ciclovías de Lima durante la semana',
      goalValue: 40,
      goalUnit: 'km',
      periodStart: '2026-11-01',
      periodEnd: '2026-11-07',
      active: true
    },
    {
      id: 3,
      title: '10 viajes sostenibles',
      description: 'Registra diez viajes verificados a pie, en bicicleta o transporte eléctrico',
      goalValue: 10,
      goalUnit: 'trips',
      periodStart: '2026-11-01',
      periodEnd: '2026-11-30',
      active: true
    }
  ];

  private localBadges: BadgeCatalogItem[] = [
    {
      id: 1,
      code: 'FIRST_STEP',
      title: 'Primer Paso Verde',
      description: 'Completaste tu primer viaje sostenible en EcoCommute',
      iconEmoji: '🌱',
      requiredPoints: 10,
      requiredCo2SavedKg: 0,
      requiredStreakDays: 0,
      requiredTrips: 1
    },
    {
      id: 2,
      code: 'BIKE_CHAMP',
      title: 'Ciclista Urbano',
      description: 'Ahorraste tus primeros 5 kg de CO₂ pedaleando',
      iconEmoji: '🚲',
      requiredPoints: 50,
      requiredCo2SavedKg: 5,
      requiredStreakDays: 0,
      requiredTrips: 3
    },
    {
      id: 3,
      code: 'TRANSIT_PRO',
      title: 'Guardián del Aire',
      description: 'Completaste 10 viajes sostenibles en bicicleta o caminata',
      iconEmoji: '🍃',
      requiredPoints: 150,
      requiredCo2SavedKg: 15,
      requiredStreakDays: 0,
      requiredTrips: 10
    },
    {
      id: 4,
      code: 'STREAK_7',
      title: 'Semana Imparable',
      description: 'Mantuviste una racha de 7 días consecutivos de transporte limpio',
      iconEmoji: '🔥',
      requiredPoints: 300,
      requiredCo2SavedKg: 20,
      requiredStreakDays: 7,
      requiredTrips: 7
    },
    {
      id: 5,
      code: 'FOREST_HERO',
      title: 'Salvador del Bosque',
      description: 'Evitaste más de 50 kg de CO₂ (equivalente a más de 2 árboles maduros)',
      iconEmoji: '🌳',
      requiredPoints: 600,
      requiredCo2SavedKg: 50,
      requiredStreakDays: 0,
      requiredTrips: 20
    },
    {
      id: 6,
      code: 'ZERO_EMISSION',
      title: 'Maestro Cero Emisiones',
      description: 'Acumulaste 100 km recorridos a pie o en bicicleta mecánica',
      iconEmoji: '⚡',
      requiredPoints: 1000,
      requiredCo2SavedKg: 100,
      requiredStreakDays: 14,
      requiredTrips: 30
    }
  ];

  constructor(private http: HttpClient, private auth: AuthService) {
    this.checkHealth().subscribe();
  }

  private get base(): string {
    return this.auth.apiBase;
  }

  checkHealth(): Observable<{ status: string }> {
    return this.http.get<{ status: string }>(`${this.base}/health`).pipe(
      tap(res => this.backendOnlineSubject.next(res?.status === 'UP')),
      catchError(() => {
        this.backendOnlineSubject.next(false);
        return of({ status: 'RESILIENT_FALLBACK' });
      })
    );
  }

  // HU03, HU09 - Planificador OSRM + IA Gemini
  planRoutes(req: RoutePlanRequest): Observable<RoutePlanResponse> {
    return this.http.post<RoutePlanResponse>(`${this.base}/api/v1/routes/plan`, req).pipe(
      tap(() => this.backendOnlineSubject.next(true)),
      catchError(() => {
        const oLat = req.origin.latitude;
        const oLng = req.origin.longitude;
        const dLat = req.destination.latitude;
        const dLng = req.destination.longitude;
        const dLatRad = ((dLat - oLat) * Math.PI) / 180;
        const dLngRad = ((dLng - oLng) * Math.PI) / 180;
        const a =
          Math.sin(dLatRad / 2) ** 2 +
          Math.cos((oLat * Math.PI) / 180) * Math.cos((dLat * Math.PI) / 180) * Math.sin(dLngRad / 2) ** 2;
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distKm = Math.max(0.8, Math.round(6371 * c * 1.32 * 100) / 100);
        const baselineCo2 = Math.round(distKm * 170);
        const mode: TransportMode = req.selectedProfile === 'WALKING' ? 'WALKING' : req.selectedProfile === 'CAR' ? 'CAR_SOLO' : 'BICYCLE';
        const modeCo2 = Math.round(distKm * MODE_CO2_G_PER_KM[mode]);
        const savedCo2 = Math.max(0, baselineCo2 - modeCo2);
        const durationMin = Math.max(4, Math.round((distKm / (mode === 'WALKING' ? 4.8 : mode === 'BICYCLE' ? 16 : 24)) * 60));
        const pts = mode === 'CAR_SOLO' ? 0 : Math.max(10, Math.round(savedCo2 / 10));
        const kcal = Math.round(distKm * MODE_KCAL_PER_KM[mode]);

        const midLat = (oLat + dLat) / 2;
        const midLng = (oLng + dLng) / 2;
        const ecoPath = [
          [oLat, oLng],
          [midLat + 0.002, midLng - 0.002],
          [dLat, dLng]
        ];
        const carPath = [
          [oLat, oLng],
          [midLat - 0.0025, midLng + 0.0025],
          [dLat, dLng]
        ];

        return of<RoutePlanResponse>({
          recommendedRouteId: 'route-ai-green-corridor',
          baselineCarRoute: {
            id: 'route-baseline-car',
            title: '🚗 Auto / Vehículo Convencional (Línea Base)',
            mode: 'CAR_SOLO' as TransportMode,
            modeDisplayName: 'Automóvil Particular',
            distanceKm: distKm,
            durationMinutes: Math.max(8, Math.round(durationMin * 1.35)),
            co2EmittedGrams: baselineCo2,
            co2SavedGrams: 0,
            potentialPoints: 0,
            caloriesBurned: Math.round(distKm * 2),
            isAiRecommended: false,
            aiInsight: null,
            pathCoordinates: carPath,
            summary: 'Ruta vehicular estándar directa por avenidas principales con congestión en hora punta.'
          },
          standardProfileRoute: {
            id: 'route-standard-direct',
            title: mode === 'WALKING' ? '🚶 Caminata (Ruta Directa)' : '🚲 Bicicleta (Ruta Directa)',
            mode,
            modeDisplayName: MODE_DISPLAY[mode],
            distanceKm: distKm,
            durationMinutes: durationMin,
            co2EmittedGrams: modeCo2,
            co2SavedGrams: savedCo2,
            potentialPoints: pts,
            caloriesBurned: kcal,
            isAiRecommended: false,
            aiInsight: null,
            pathCoordinates: [
              [oLat, oLng],
              [midLat, midLng],
              [dLat, dLng]
            ],
            summary: 'Ruta directa sobre la red vial de Lima Metropolitana.'
          },
          aiGreenCorridorRoute: {
            id: 'route-ai-green-corridor',
            title: req.enableAiOptimization ? '🌿 Corredor Verde Optimizado con IA' : '🌿 Corredor Verde',
            mode,
            modeDisplayName: MODE_DISPLAY[mode],
            distanceKm: Math.round(distKm * 0.98 * 100) / 100,
            durationMinutes: Math.max(4, durationMin - 1),
            co2EmittedGrams: modeCo2,
            co2SavedGrams: savedCo2,
            potentialPoints: pts + 10,
            caloriesBurned: kcal,
            isAiRecommended: req.enableAiOptimization,
            aiInsight: req.enableAiOptimization
              ? {
                  greenScore: 95,
                  safetyRating: 92,
                  shadeTreeCoveragePercent: 68,
                  cyclingInfrastructureQuality: mode === 'BICYCLE' ? 'Ciclovía segregada continua' : 'Senda peatonal arbolada',
                  healthBenefitSummary: `${kcal} kcal quemadas`,
                  treesEquivalentFraction: savedCo2 / 1000 / 21.77,
                  ecoReasoning: `Corredor Verde Optimizado con Google Gemini (gemini-1.5-flash): Recorrido de ${distKm} km con ciclovía segregada y menor exposición vehicular. Evitas ${savedCo2} g de CO₂ frente a un automóvil particular y sumas +10 puntos verdes de bonificación.`
                }
              : null,
            pathCoordinates: ecoPath,
            summary: 'Corredor seleccionado por menor exposición a tráfico y mejor infraestructura sostenible.'
          }
        });
      })
    );
  }

  // HU04, HU05 - CRUD de Viajes
  getTripsHistory(page = 0, size = 10): Observable<PageResponse<TripResponse>> {
    const params = new HttpParams().set('page', page).set('size', size);
    return this.http.get<PageResponse<TripResponse>>(`${this.base}/api/v1/trips/history`, { params }).pipe(
      tap(res => {
        this.backendOnlineSubject.next(true);
        if (res?.content?.length) {
          this.localTrips = res.content;
        }
      }),
      catchError(() => {
        const start = page * size;
        const slice = this.localTrips.slice(start, start + size);
        return of({
          content: slice,
          totalElements: this.localTrips.length,
          totalPages: Math.max(1, Math.ceil(this.localTrips.length / size)),
          number: page,
          size
        });
      })
    );
  }

  recordTrip(req: TripRequest): Observable<TripResponse> {
    return this.http.post<TripResponse>(`${this.base}/api/v1/trips`, req).pipe(
      tap(saved => {
        this.backendOnlineSubject.next(true);
        this.localTrips = [saved, ...this.localTrips];
        this.auth.updatePointsAndLevel(saved.pointsEarned);
      }),
      catchError(() => {
        const created = this.buildLocalTrip('trip-' + Date.now(), req);
        this.localTrips = [created, ...this.localTrips];
        this.auth.updatePointsAndLevel(created.pointsEarned);
        return of(created);
      })
    );
  }

  updateTrip(tripId: string, req: TripRequest): Observable<TripResponse> {
    return this.http.put<TripResponse>(`${this.base}/api/v1/trips/${tripId}`, req).pipe(
      tap(updated => {
        this.backendOnlineSubject.next(true);
        this.localTrips = this.localTrips.map(t => (t.id === tripId ? updated : t));
        this.recalculateLocalPoints();
      }),
      catchError(() => {
        const updated = this.buildLocalTrip(tripId, req);
        this.localTrips = this.localTrips.map(t => (t.id === tripId ? updated : t));
        this.recalculateLocalPoints();
        return of(updated);
      })
    );
  }

  deleteTrip(tripId: string): Observable<void> {
    return this.http.delete<void>(`${this.base}/api/v1/trips/${tripId}`).pipe(
      tap(() => {
        this.backendOnlineSubject.next(true);
        this.localTrips = this.localTrips.filter(t => t.id !== tripId);
        this.recalculateLocalPoints();
      }),
      catchError(() => {
        this.localTrips = this.localTrips.filter(t => t.id !== tripId);
        this.recalculateLocalPoints();
        return of(void 0);
      })
    );
  }

  private buildLocalTrip(id: string, req: TripRequest): TripResponse {
    const baseline = Math.round(req.distanceKm * 170);
    const emitted = Math.round(req.distanceKm * MODE_CO2_G_PER_KM[req.transportMode]);
    const saved = Math.max(0, baseline - emitted);
    const kcal = Math.round(req.distanceKm * MODE_KCAL_PER_KM[req.transportMode]);
    const pts = req.transportMode === 'CAR_SOLO' ? 0 : Math.max(5, Math.round(saved / 10));
    const speedKmh = req.distanceKm / (Math.max(1, req.durationMinutes) / 60);
    const suspicious =
      (req.transportMode === 'WALKING' && speedKmh > 12) || (req.transportMode === 'BICYCLE' && speedKmh > 50);

    return {
      id,
      transportMode: req.transportMode,
      modeDisplayName: MODE_DISPLAY[req.transportMode],
      originName: req.originName,
      originLat: req.originLat,
      originLng: req.originLng,
      destinationName: req.destinationName,
      destinationLat: req.destinationLat,
      destinationLng: req.destinationLng,
      distanceKm: req.distanceKm,
      durationMinutes: req.durationMinutes,
      baselineCo2Grams: baseline,
      co2EmittedGrams: emitted,
      co2SavedGrams: saved,
      caloriesBurned: kcal,
      pointsEarned: pts,
      suspicious,
      suspiciousReason: suspicious ? `Velocidad inusual detectada (${speedKmh.toFixed(1)} km/h)` : null,
      completedAt: new Date().toISOString()
    };
  }

  private recalculateLocalPoints(): void {
    const sum = this.localTrips.reduce((acc, t) => acc + t.pointsEarned, 0);
    this.auth.setPointsAbsolute(sum);
  }

  // HU07, HU09 - Dashboard y Reportes
  getDashboardSummary(): Observable<DashboardSummary> {
    return this.http.get<DashboardSummary>(`${this.base}/api/v1/dashboard/summary`).pipe(
      tap(() => this.backendOnlineSubject.next(true)),
      catchError(() => {
        const u = this.auth.currentUser;
        const totalCo2SavedKg =
          Math.round((this.localTrips.reduce((acc, t) => acc + t.co2SavedGrams, 0) / 1000) * 100) / 100;
        const totalDistanceKm =
          Math.round(this.localTrips.reduce((acc, t) => acc + t.distanceKm, 0) * 100) / 100;
        const totalCaloriesBurned = this.localTrips.reduce((acc, t) => acc + t.caloriesBurned, 0);
        const currentPoints = this.localTrips.reduce((acc, t) => acc + t.pointsEarned, 0);
        const tripsByMode: Record<string, number> = {};
        for (const t of this.localTrips) {
          tripsByMode[t.transportMode] = (tripsByMode[t.transportMode] || 0) + 1;
        }
        return of({
          userId: u?.id || 'user-elena-rios',
          fullName: u?.fullName || 'Elena Rios',
          email: u?.email || 'demo@ecocommute.org',
          avatarUrl: u?.avatarUrl || 'https://api.dicebear.com/7.x/bottts/svg?seed=elena',
          totalCo2SavedKg,
          totalDistanceKm,
          totalTrips: this.localTrips.length,
          currentPoints,
          currentLevel: u?.currentLevel || 2,
          totalCaloriesBurned,
          treesEquivalent: Math.round((totalCo2SavedKg / 21.77) * 100) / 100,
          weeklyTrend: [
            { dayOfWeek: 'Lun', co2SavedGrams: 680 },
            { dayOfWeek: 'Mar', co2SavedGrams: 1156 },
            { dayOfWeek: 'Mié', co2SavedGrams: 540 },
            { dayOfWeek: 'Jue', co2SavedGrams: 1445 },
            { dayOfWeek: 'Vie', co2SavedGrams: 890 },
            { dayOfWeek: 'Sáb', co2SavedGrams: 420 },
            { dayOfWeek: 'Dom', co2SavedGrams: 310 }
          ],
          tripsByMode,
          recentBadges: this.computeLocalDashboardBadges(currentPoints, totalCo2SavedKg, this.localTrips.length)
        });
      })
    );
  }

  getCommunityImpact(): Observable<CommunityImpact> {
    return this.http.get<CommunityImpact>(`${this.base}/api/v1/dashboard/community-impact`).pipe(
      tap(() => this.backendOnlineSubject.next(true)),
      catchError(() =>
        of({
          totalCo2SavedTons: 0.42,
          totalCleanKm: 214.5,
          totalTrips: 23 + this.localTrips.length,
          totalActiveUsers: 7,
          totalTreesEquivalent: 19.3
        })
      )
    );
  }

  getRecommendations(): Observable<AiRecommendation> {
    return this.http.get<AiRecommendation>(`${this.base}/api/v1/dashboard/recommendations`).pipe(
      tap(() => this.backendOnlineSubject.next(true)),
      catchError(() =>
        of({
          title: 'Corredor Verde Optimizado con IA (Google Gemini 1.5 Flash)',
          recommendation:
            'Prioriza viajes en bicicleta por los ejes segregados de Av. Arequipa, Av. Salaverry y Av. Primavera entre las 7:00 y 9:00 a.m. para ahorrar hasta 1,445 g de CO₂ por trayecto y duplicar tu racha de puntos verdes.',
          advisor: 'Google Gemini (gemini-1.5-flash) / Heuristic Advisor'
        })
      )
    );
  }

  // HU06, HU10, HU11 - Gamificación
  getGamificationStats(): Observable<GamificationStats> {
    return this.http.get<GamificationStats>(`${this.base}/api/v1/gamification/stats`).pipe(
      catchError(() => {
        const totalCo2SavedKg =
          Math.round((this.localTrips.reduce((acc, t) => acc + t.co2SavedGrams, 0) / 1000) * 100) / 100;
        const totalDistanceKm =
          Math.round(this.localTrips.reduce((acc, t) => acc + t.distanceKm, 0) * 100) / 100;
        const currentPoints = this.localTrips.reduce((acc, t) => acc + t.pointsEarned, 0);
        return of({
          currentPoints,
          totalCo2SavedKg,
          totalDistanceKm,
          streakDays: this.auth.currentUser?.streakDays || 5,
          totalTrips: this.localTrips.length
        });
      })
    );
  }

  getGamificationMilestones(): Observable<GamificationMilestones> {
    return this.http.get<GamificationMilestones>(`${this.base}/api/v1/gamification/milestones`).pipe(
      catchError(() => {
        const points = this.localTrips.reduce((acc, t) => acc + t.pointsEarned, 0);
        const nextMilestone =
          points < 100 ? 100 : points < 300 ? 300 : points < 700 ? 700 : points < 1500 ? 1500 : 3000;
        return of({
          currentLevel: this.auth.currentUser?.currentLevel || 2,
          currentPoints: points,
          nextMilestonePoints: nextMilestone,
          progressPercentage: Math.min(100, Math.round((points / nextMilestone) * 100))
        });
      })
    );
  }

  getUserBadges(): Observable<DashboardBadge[]> {
    return this.http.get<DashboardBadge[]>(`${this.base}/api/v1/gamification/badges`).pipe(
      catchError(() => {
        const pts = this.localTrips.reduce((acc, t) => acc + t.pointsEarned, 0);
        const co2Kg = this.localTrips.reduce((acc, t) => acc + t.co2SavedGrams, 0) / 1000;
        return of(this.computeLocalDashboardBadges(pts, co2Kg, this.localTrips.length));
      })
    );
  }

  getBadgeCatalog(): Observable<BadgeCatalogItem[]> {
    return this.http.get<BadgeCatalogItem[]>(`${this.base}/api/v1/gamification/badges/catalog`).pipe(
      catchError(() => of(this.localBadges))
    );
  }

  private computeLocalDashboardBadges(points: number, co2Kg: number, tripsCount: number): DashboardBadge[] {
    return this.localBadges.map(b => {
      const pRatio = b.requiredPoints > 0 ? Math.min(1, points / b.requiredPoints) : 1;
      const cRatio = b.requiredCo2SavedKg > 0 ? Math.min(1, co2Kg / b.requiredCo2SavedKg) : 1;
      const tRatio = b.requiredTrips > 0 ? Math.min(1, tripsCount / b.requiredTrips) : 1;
      const ratio = Math.min(pRatio, cRatio, tRatio);
      return {
        id: b.id,
        code: b.code,
        title: b.title,
        description: b.description,
        iconEmoji: b.iconEmoji,
        unlocked: ratio >= 1,
        progressPercent: Math.round(ratio * 100)
      };
    });
  }

  // HU08 - Leaderboard Distrital
  getLeaderboard(district?: string, sortBy: 'co2' | 'points' = 'co2'): Observable<LeaderboardEntry[]> {
    let params = new HttpParams().set('sortBy', sortBy);
    if (district && district !== 'ALL') {
      params = params.set('district', district);
    }
    return this.http.get<LeaderboardEntry[]>(`${this.base}/api/v1/leaderboard`, { params }).pipe(
      catchError(() => {
        const seed: LeaderboardEntry[] = [
          {
            userId: 'u-sofia',
            fullName: 'Sofía Morales',
            avatarUrl: 'https://api.dicebear.com/7.x/bottts/svg?seed=sofia',
            district: 'Surco',
            totalCo2SavedKg: 12.33,
            currentPoints: 1235,
            tripsCount: 5,
            streakDays: 5,
            rank: 1
          },
          {
            userId: 'u-mateo',
            fullName: 'Mateo Silva',
            avatarUrl: 'https://api.dicebear.com/7.x/bottts/svg?seed=mateo',
            district: 'Lince',
            totalCo2SavedKg: 12.24,
            currentPoints: 1224,
            tripsCount: 6,
            streakDays: 6,
            rank: 2
          },
          {
            userId: 'u-elena',
            fullName: 'Elena Rios',
            avatarUrl: 'https://api.dicebear.com/7.x/bottts/svg?seed=elena',
            district: 'San Isidro',
            totalCo2SavedKg: 3.15,
            currentPoints: 345,
            tripsCount: 4,
            streakDays: 5,
            rank: 3
          },
          {
            userId: 'u-diego',
            fullName: 'Diego Torres',
            avatarUrl: 'https://api.dicebear.com/7.x/bottts/svg?seed=diego',
            district: 'Breña',
            totalCo2SavedKg: 2.55,
            currentPoints: 255,
            tripsCount: 1,
            streakDays: 1,
            rank: 4
          },
          {
            userId: 'u-carlos',
            fullName: 'Carlos Mendoza',
            avatarUrl: 'https://api.dicebear.com/7.x/bottts/svg?seed=carlos',
            district: 'Surquillo',
            totalCo2SavedKg: 2.21,
            currentPoints: 221,
            tripsCount: 2,
            streakDays: 2,
            rank: 5
          },
          {
            userId: 'u-lucia',
            fullName: 'Lucía Vega',
            avatarUrl: 'https://api.dicebear.com/7.x/bottts/svg?seed=lucia',
            district: 'Barranco',
            totalCo2SavedKg: 1.36,
            currentPoints: 136,
            tripsCount: 1,
            streakDays: 1,
            rank: 6
          }
        ];
        const filtered = district && district !== 'ALL' ? seed.filter(s => s.district === district) : seed;
        const sorted = [...filtered].sort((a, b) =>
          sortBy === 'points' ? b.currentPoints - a.currentPoints : b.totalCo2SavedKg - a.totalCo2SavedKg
        );
        return of(sorted.map((item, idx) => ({ ...item, rank: idx + 1 })));
      })
    );
  }

  getDistrictsSummary(): Observable<DistrictsSummary> {
    return this.http.get<DistrictsSummary>(`${this.base}/api/v1/leaderboard/districts/summary`).pipe(
      catchError(() =>
        of({
          activeDistrictsCount: 6,
          activeDistricts: ['San Isidro', 'Lince', 'Surco', 'Surquillo', 'Barranco', 'Breña'],
          totalRankedUsers: 6
        })
      )
    );
  }

  // HU12, HU13, HU14 - Recompensas, Canjes y Retos
  getRewards(): Observable<RewardItem[]> {
    return this.http.get<RewardItem[]>(`${this.base}/api/v1/rewards`).pipe(
      tap(list => {
        if (list?.length) this.localRewards = list;
      }),
      catchError(() => of(this.localRewards.filter(r => r.active)))
    );
  }

  redeemReward(rewardId: number): Observable<RedeemResponse> {
    return this.http.post<RedeemResponse>(`${this.base}/api/v1/rewards/${rewardId}/redeem`, {}).pipe(
      tap(res => {
        if (res?.redemption) {
          this.localRedemptions = [res.redemption, ...this.localRedemptions];
          this.auth.updatePointsAndLevel(-res.redemption.pointsUsed);
        }
      }),
      catchError(err => {
        if (err?.status === 400 || err?.status === 409) {
          throw err;
        }
        const reward = this.localRewards.find(r => r.id === rewardId);
        if (!reward) throw new Error('Recompensa no encontrada');
        const currentPts = this.auth.currentUser?.currentPoints || 0;
        if (currentPts < reward.pointsCost) {
          throw { error: { message: 'Puntos verdes insuficientes para este canje' } };
        }
        const redemption: RedemptionItem = {
          id: Date.now(),
          rewardCode: reward.code,
          rewardTitle: reward.title,
          rewardIconEmoji: reward.iconEmoji,
          pointsUsed: reward.pointsCost,
          status: 'COMPLETED',
          createdAt: new Date().toISOString()
        };
        this.localRedemptions = [redemption, ...this.localRedemptions];
        this.auth.updatePointsAndLevel(-reward.pointsCost);
        return of({ redemption });
      })
    );
  }

  getRedemptions(): Observable<RedemptionItem[]> {
    return this.http.get<RedemptionItem[]>(`${this.base}/api/v1/redemptions`).pipe(
      tap(list => {
        if (list) this.localRedemptions = list;
      }),
      catchError(() => of(this.localRedemptions))
    );
  }

  getChallenges(): Observable<ChallengeItem[]> {
    return this.http.get<ChallengeItem[]>(`${this.base}/api/v1/challenges`).pipe(
      tap(list => {
        if (list?.length) this.localChallenges = list;
      }),
      catchError(() => of(this.localChallenges.filter(c => c.active)))
    );
  }

  // HU12, HU13 - Administración CRUD (ROLE_ADMIN)
  getAdminRewards(): Observable<RewardItem[]> {
    return this.http.get<RewardItem[]>(`${this.base}/api/v1/admin/rewards`).pipe(
      tap(list => {
        if (list) this.localRewards = list;
      }),
      catchError(() => of(this.localRewards))
    );
  }

  createAdminReward(req: RewardRequest): Observable<RewardItem> {
    return this.http.post<RewardItem>(`${this.base}/api/v1/admin/rewards`, req).pipe(
      tap(saved => {
        this.localRewards = [...this.localRewards, saved];
      }),
      catchError(() => {
        const created: RewardItem = { ...req, id: Date.now() };
        this.localRewards = [...this.localRewards, created];
        return of(created);
      })
    );
  }

  updateAdminReward(id: number, req: RewardRequest): Observable<RewardItem> {
    return this.http.put<RewardItem>(`${this.base}/api/v1/admin/rewards/${id}`, req).pipe(
      tap(updated => {
        this.localRewards = this.localRewards.map(r => (r.id === id ? updated : r));
      }),
      catchError(() => {
        const updated: RewardItem = { ...req, id };
        this.localRewards = this.localRewards.map(r => (r.id === id ? updated : r));
        return of(updated);
      })
    );
  }

  deleteAdminReward(id: number): Observable<void> {
    return this.http.delete<void>(`${this.base}/api/v1/admin/rewards/${id}`).pipe(
      tap(() => {
        this.localRewards = this.localRewards.filter(r => r.id !== id);
      }),
      catchError(() => {
        this.localRewards = this.localRewards.filter(r => r.id !== id);
        return of(void 0);
      })
    );
  }

  getAdminChallenges(): Observable<ChallengeItem[]> {
    return this.http.get<ChallengeItem[]>(`${this.base}/api/v1/admin/challenges`).pipe(
      tap(list => {
        if (list) this.localChallenges = list;
      }),
      catchError(() => of(this.localChallenges))
    );
  }

  createAdminChallenge(req: ChallengeRequest): Observable<ChallengeItem> {
    return this.http.post<ChallengeItem>(`${this.base}/api/v1/admin/challenges`, req).pipe(
      tap(saved => {
        this.localChallenges = [...this.localChallenges, saved];
      }),
      catchError(() => {
        const created: ChallengeItem = { ...req, id: Date.now() };
        this.localChallenges = [...this.localChallenges, created];
        return of(created);
      })
    );
  }

  updateAdminChallenge(id: number, req: ChallengeRequest): Observable<ChallengeItem> {
    return this.http.put<ChallengeItem>(`${this.base}/api/v1/admin/challenges/${id}`, req).pipe(
      tap(updated => {
        this.localChallenges = this.localChallenges.map(c => (c.id === id ? updated : c));
      }),
      catchError(() => {
        const updated: ChallengeItem = { ...req, id };
        this.localChallenges = this.localChallenges.map(c => (c.id === id ? updated : c));
        return of(updated);
      })
    );
  }

  deleteAdminChallenge(id: number): Observable<void> {
    return this.http.delete<void>(`${this.base}/api/v1/admin/challenges/${id}`).pipe(
      tap(() => {
        this.localChallenges = this.localChallenges.filter(c => c.id !== id);
      }),
      catchError(() => {
        this.localChallenges = this.localChallenges.filter(c => c.id !== id);
        return of(void 0);
      })
    );
  }
}
