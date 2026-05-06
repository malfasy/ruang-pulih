async function getUser() {
    const { data: { user } } = await _supabase.auth.getUser();
    if (!user) return null;
    // Fetch profile name
    const { data: profile } = await _supabase
        .from('profiles')
        .select('name')
        .eq('id', user.id)
        .single();
    return {
        id: user.id,
        email: user.email,
        name: profile?.name || user.user_metadata?.name || user.email.split('@')[0],
    };
}

async function signUp(email, password, name) {
    const { data, error } = await _supabase.auth.signUp({
        email,
        password,
        options: { data: { name } }
    });
    if (error) throw error;
    return data;
}

async function signIn(email, password) {
    const { data, error } = await _supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    return data;
}

async function signOut() {
    const { error } = await _supabase.auth.signOut();
    if (error) throw error;
    window.location.href = '/auth/login.html';
}

async function requireAuth() {
    const { data: { session } } = await _supabase.auth.getSession();
    if (!session) {
        window.location.href = '/auth/login.html';
        return null;
    }
    return session;
}

async function requireGuest() {
    const { data: { session } } = await _supabase.auth.getSession();
    if (session) {
        window.location.href = '/onboarding.html';
        return true;
    }
    return false;
}

function getUserInitials(name) {
    if (!name) return '?';
    const parts = name.trim().split(' ');
    let initials = parts[0][0].toUpperCase();
    if (parts.length > 1) initials += parts[parts.length - 1][0].toUpperCase();
    return initials;
}
