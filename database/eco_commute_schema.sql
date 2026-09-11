CREATE DATABASE eco_commute;

\c eco_commute;

CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE users (
    id VARCHAR(36) PRIMARY KEY DEFAULT gen_random_uuid()::text,
    email VARCHAR(150) NOT NULL UNIQUE,
    password VARCHAR(255),
    full_name VARCHAR(120) NOT NULL,
    avatar_url VARCHAR(500),
    role VARCHAR(30) NOT NULL DEFAULT 'ROLE_USER',
    active BOOLEAN NOT NULL DEFAULT TRUE,
    auth_provider VARCHAR(30) NOT NULL DEFAULT 'LOCAL',
    google_sub VARCHAR(150),
    current_points INTEGER NOT NULL DEFAULT 0,
    current_level INTEGER NOT NULL DEFAULT 1,
    streak_days INTEGER NOT NULL DEFAULT 0,
    last_trip_date TIMESTAMP,
    has_bicycle BOOLEAN NOT NULL DEFAULT TRUE,
    max_walking_minutes INTEGER NOT NULL DEFAULT 20,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT chk_users_role CHECK (role IN ('ROLE_USER', 'ROLE_ADMIN')),
    CONSTRAINT chk_users_points CHECK (current_points >= 0),
    CONSTRAINT chk_users_level CHECK (current_level >= 1),
    CONSTRAINT chk_users_streak CHECK (streak_days >= 0)
);

CREATE TABLE emission_factors (
    id BIGSERIAL PRIMARY KEY,
    transport_mode VARCHAR(40) NOT NULL UNIQUE,
    grams_co2_per_km NUMERIC(10,2) NOT NULL,
    description VARCHAR(255),
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT chk_emission_transport_mode CHECK (transport_mode IN ('CAR_SOLO', 'BICYCLE', 'WALKING')),
    CONSTRAINT chk_emission_factor CHECK (grams_co2_per_km >= 0)
);

CREATE TABLE badges (
    id BIGSERIAL PRIMARY KEY,
    code VARCHAR(60) NOT NULL UNIQUE,
    title VARCHAR(120) NOT NULL,
    description VARCHAR(255),
    icon_url VARCHAR(500),
    icon_emoji VARCHAR(20),
    required_points INTEGER NOT NULL DEFAULT 0,
    required_co2_saved_kg NUMERIC(10,2) NOT NULL DEFAULT 0,
    required_streak_days INTEGER NOT NULL DEFAULT 0,
    required_trips INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT chk_badges_points CHECK (required_points >= 0),
    CONSTRAINT chk_badges_co2 CHECK (required_co2_saved_kg >= 0),
    CONSTRAINT chk_badges_streak CHECK (required_streak_days >= 0),
    CONSTRAINT chk_badges_trips CHECK (required_trips >= 0)
);

CREATE TABLE trips (
    id VARCHAR(36) PRIMARY KEY DEFAULT gen_random_uuid()::text,
    user_id VARCHAR(36) NOT NULL,
    transport_mode VARCHAR(40) NOT NULL,
    origin_name VARCHAR(180),
    origin_lat NUMERIC(10,7) NOT NULL,
    origin_lng NUMERIC(10,7) NOT NULL,
    destination_name VARCHAR(180),
    destination_lat NUMERIC(10,7) NOT NULL,
    destination_lng NUMERIC(10,7) NOT NULL,
    distance_km NUMERIC(10,2) NOT NULL,
    duration_minutes INTEGER NOT NULL,
    baseline_co2_grams NUMERIC(12,2) NOT NULL DEFAULT 0,
    co2_emitted_grams NUMERIC(12,2) NOT NULL DEFAULT 0,
    co2_saved_grams NUMERIC(12,2) NOT NULL DEFAULT 0,
    calories_burned INTEGER NOT NULL DEFAULT 0,
    points_earned INTEGER NOT NULL DEFAULT 0,
    suspicious BOOLEAN NOT NULL DEFAULT FALSE,
    suspicious_reason VARCHAR(255),
    completed_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_trips_users FOREIGN KEY (user_id) REFERENCES users(id),
    CONSTRAINT chk_trips_transport_mode CHECK (transport_mode IN ('CAR_SOLO', 'BICYCLE', 'WALKING')),
    CONSTRAINT chk_trips_distance CHECK (distance_km >= 0),
    CONSTRAINT chk_trips_duration CHECK (duration_minutes >= 0),
    CONSTRAINT chk_trips_points CHECK (points_earned >= 0)
);

CREATE TABLE user_stats (
    id VARCHAR(36) PRIMARY KEY DEFAULT gen_random_uuid()::text,
    user_id VARCHAR(36) NOT NULL UNIQUE,
    total_co2_saved_kg NUMERIC(12,4) NOT NULL DEFAULT 0,
    total_distance_km NUMERIC(12,2) NOT NULL DEFAULT 0,
    total_trips INTEGER NOT NULL DEFAULT 0,
    total_calories_burned INTEGER NOT NULL DEFAULT 0,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_user_stats_users FOREIGN KEY (user_id) REFERENCES users(id),
    CONSTRAINT chk_user_stats_co2 CHECK (total_co2_saved_kg >= 0),
    CONSTRAINT chk_user_stats_distance CHECK (total_distance_km >= 0),
    CONSTRAINT chk_user_stats_trips CHECK (total_trips >= 0)
);

CREATE TABLE user_badges (
    id VARCHAR(36) PRIMARY KEY DEFAULT gen_random_uuid()::text,
    user_id VARCHAR(36) NOT NULL,
    badge_id BIGINT NOT NULL,
    awarded_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uq_user_badges UNIQUE (user_id, badge_id),
    CONSTRAINT fk_user_badges_users FOREIGN KEY (user_id) REFERENCES users(id),
    CONSTRAINT fk_user_badges_badges FOREIGN KEY (badge_id) REFERENCES badges(id)
);

CREATE INDEX idx_trips_user_completed_at ON trips(user_id, completed_at DESC);
CREATE INDEX idx_trips_transport_mode ON trips(transport_mode);
CREATE INDEX idx_user_stats_co2 ON user_stats(total_co2_saved_kg DESC);
