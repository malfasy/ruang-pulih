CREATE TABLE IF NOT EXISTS profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    name TEXT NOT NULL DEFAULT '',
    created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile"
    ON profiles FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
    ON profiles FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile"
    ON profiles FOR UPDATE USING (auth.uid() = id);

CREATE TABLE IF NOT EXISTS user_onboarding (
    id BIGSERIAL PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    role VARCHAR(50),
    full_name VARCHAR(100),
    patient_name VARCHAR(100),
    operation_type VARCHAR(50),
    surgery_date DATE,
    pain_level INT,
    mobility VARCHAR(50),
    symptoms TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE user_onboarding ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own onboarding"
    ON user_onboarding FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own onboarding"
    ON user_onboarding FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own onboarding"
    ON user_onboarding FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own onboarding"
    ON user_onboarding FOR DELETE USING (auth.uid() = user_id);

CREATE TABLE IF NOT EXISTS user_daily_monitoring (
    id BIGSERIAL PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    profile_id BIGINT NOT NULL REFERENCES user_onboarding(id) ON DELETE CASCADE,
    record_date DATE NOT NULL,

    spo2 INT DEFAULT NULL,
    heart_rate INT DEFAULT NULL,
    pain_level INT DEFAULT NULL,

    temp FLOAT DEFAULT NULL,
    blood_volume VARCHAR(50) DEFAULT NULL,
    blood_color VARCHAR(50) DEFAULT NULL,
    blood_clots VARCHAR(50) DEFAULT NULL,

    stump_pain INT DEFAULT NULL,
    phantom_pain INT DEFAULT NULL,
    wound_color VARCHAR(50) DEFAULT NULL,
    wound_swelling VARCHAR(50) DEFAULT NULL,
    wound_fluid VARCHAR(50) DEFAULT NULL,
    wound_odor VARCHAR(50) DEFAULT NULL,

    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now(),

    UNIQUE (user_id, profile_id, record_date)
);

ALTER TABLE user_daily_monitoring ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own monitoring"
    ON user_daily_monitoring FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own monitoring"
    ON user_daily_monitoring FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own monitoring"
    ON user_daily_monitoring FOR UPDATE USING (auth.uid() = user_id);

CREATE TABLE IF NOT EXISTS user_wound_logs (
    id BIGSERIAL PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    profile_id BIGINT NOT NULL REFERENCES user_onboarding(id) ON DELETE CASCADE,
    record_date DATE NOT NULL,

    image_url TEXT DEFAULT NULL,
    status VARCHAR(50) DEFAULT NULL,
    redness VARCHAR(100) DEFAULT NULL,
    swelling VARCHAR(100) DEFAULT NULL,
    fluid VARCHAR(100) DEFAULT NULL,
    size VARCHAR(50) DEFAULT NULL,
    note TEXT DEFAULT NULL,
    redness_color VARCHAR(20) DEFAULT NULL,
    icon_bg VARCHAR(20) DEFAULT NULL,
    icon_svg TEXT DEFAULT NULL,

    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now(),

    UNIQUE (user_id, profile_id, record_date)
);

ALTER TABLE user_wound_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own wound logs"
    ON user_wound_logs FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own wound logs"
    ON user_wound_logs FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own wound logs"
    ON user_wound_logs FOR UPDATE USING (auth.uid() = user_id);

INSERT INTO storage.buckets (id, name, public)
VALUES ('wound-photos', 'wound-photos', false)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Users can upload own wound photos"
    ON storage.objects FOR INSERT
    WITH CHECK (bucket_id = 'wound-photos' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can view own wound photos"
    ON storage.objects FOR SELECT
    USING (bucket_id = 'wound-photos' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete own wound photos"
    ON storage.objects FOR DELETE
    USING (bucket_id = 'wound-photos' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_monitoring_updated_at
    BEFORE UPDATE ON user_daily_monitoring
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_wound_logs_updated_at
    BEFORE UPDATE ON user_wound_logs
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, name)
    VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'name', ''));
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
