const fs = require('fs');

let headerPhp = fs.readFileSync('medical-web-temp/layout/header.php', 'utf8');
let indexPhp = fs.readFileSync('medical-web-temp/modules/modul_1/index.php', 'utf8');
let footerPhp = fs.readFileSync('medical-web-temp/layout/footer.php', 'utf8');

indexPhp = indexPhp.replace(/<\?php\s+require_once\s+__DIR__\s+\.\s+'\/\.\.\/\.\.\/layout\/header\.php';\s+\?>/g, '');
indexPhp = indexPhp.replace(/<\?php\s+require_once\s+__DIR__\s+\.\s+'\/\.\.\/\.\.\/layout\/footer\.php';\s+\?>/g, '');

let bodyContent = headerPhp + indexPhp + footerPhp;

bodyContent = bodyContent.replace(/<\?php[\s\S]*?\?>/g, '');

bodyContent = bodyContent.replace(/<!DOCTYPE html>.*?<body.*?>/is, `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="description" content="RuangPulih - Panduan Rehabilitasi Pasca-Operasi Mandiri">
<title>RuangPulih — Pasca-Operasi & Rehabilitasi Mandiri</title>
<script src="https://cdn.tailwindcss.com"></script>
<script>tailwind.config={theme:{extend:{fontFamily:{sans:['Poppins','system-ui','sans-serif']}}}}</script>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/css/style.css">
<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
</head>
<body class="bg-gray-50 antialiased min-h-screen">
`);

bodyContent = bodyContent.replace(/<\/body>/, `
<script src="/js/supabase-config.js"></script>
<script src="/js/auth.js"></script>
</body>`);

bodyContent = bodyContent.replace(/<script src="https:\/\/cdn\.tailwindcss\.com"><\/script>/, '');
bodyContent = bodyContent.replace(/<script>.*?tailwind\.config.*?<\/script>/s, '');
bodyContent = bodyContent.replace(/<link rel="preconnect" href="https:\/\/fonts\.googleapis\.com">/g, '');
bodyContent = bodyContent.replace(/<link rel="preconnect" href="https:\/\/fonts\.gstatic\.com" crossorigin>/g, '');
bodyContent = bodyContent.replace(/<link href="https:\/\/fonts\.googleapis\.com.*?rel="stylesheet">/g, '');
bodyContent = bodyContent.replace(/<style>.*?body\s*{.*?font-family:.*?}.*?<\/style>/s, '');

bodyContent = bodyContent.replace(/<script>[\s\S]*?<\/script>/g, '');

bodyContent += `
<script>
document.addEventListener('DOMContentLoaded', async () => {
    // Nav scroll reveal
    const navLinks = document.querySelectorAll('#floating-nav a');
    const sections = Array.from(navLinks).map(link => {
        const id = link.getAttribute('href');
        if (id && id.startsWith('#')) return document.querySelector(id);
        return null;
    }).filter(Boolean);

    const updateNav = () => {
        let currentId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.scrollY >= (sectionTop - 200)) currentId = '#' + section.getAttribute('id');
        });
        if ((window.innerHeight + Math.round(window.scrollY)) >= document.body.offsetHeight - 50) {
            currentId = '#' + sections[sections.length - 1].getAttribute('id');
        }
        navLinks.forEach(link => {
            if (link.getAttribute('href') === currentId) {
                link.classList.add('text-[#728BA9]', 'font-bold');
                link.classList.remove('text-[#7F7F7F]', 'font-medium');
            } else {
                link.classList.add('text-[#7F7F7F]', 'font-medium');
                link.classList.remove('text-[#728BA9]', 'font-bold');
            }
        });
    };
    window.addEventListener('scroll', updateNav);
    updateNav();

    // Scroll reveal
    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('reveal-stagger-parent')) {
                    entry.target.querySelectorAll('.reveal-stagger-child').forEach(child => {
                        child.classList.remove('opacity-0', 'translate-y-16', '-translate-x-16', 'translate-x-16', 'scale-95');
                    });
                } else {
                    entry.target.classList.remove('opacity-0', 'translate-y-16', '-translate-x-16', 'translate-x-16', 'scale-95');
                }
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '50px' });
    document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right, .reveal-scale, .reveal-stagger-parent')
        .forEach(el => scrollObserver.observe(el));

    // Team cards 3D tilt
    document.querySelectorAll('.team-card').forEach((card, index) => {
        const teamObserver = new IntersectionObserver((entries, obs) => {
            entries.forEach((entry, i) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('opacity-100', 'translate-y-0');
                        entry.target.classList.remove('opacity-0', 'translate-y-16');
                    }, i * 150);
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '50px' });
        card.classList.add('opacity-0', 'translate-y-16', 'duration-700');
        teamObserver.observe(card);

        let bounds;
        const rotateToMouse = (e) => {
            const leftX = e.clientX - bounds.x;
            const topY = e.clientY - bounds.y;
            const center = { x: leftX - bounds.width / 2, y: topY - bounds.height / 2 };
            const maxTilt = 8;
            card.style.transform = \`perspective(1000px) rotateX(\${(center.y / (bounds.height / 2)) * -maxTilt}deg) rotateY(\${(center.x / (bounds.width / 2)) * maxTilt}deg) scale3d(1.02, 1.02, 1.02)\`;
        };
        card.addEventListener('mouseenter', () => { bounds = card.getBoundingClientRect(); card.style.transition = 'none'; });
        card.addEventListener('mousemove', rotateToMouse);
        card.addEventListener('mouseleave', () => {
            card.style.transition = 'transform 0.5s ease-out';
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
    });

    // Auth-aware dashboard button
    try {
        const { data: { session } } = await _supabase.auth.getSession();
        const dashBtn = document.getElementById('dashboard-btn');
        if (dashBtn) {
            dashBtn.href = session ? '/onboarding.html' : '/auth/login.html';
        }
        document.querySelectorAll('.cta-link').forEach(el => {
            el.href = session ? '/onboarding.html' : '/auth/login.html';
        });
    } catch(e) {}
});
</script>
`;

// IMPORTANT FIXES FOR THE BUTTONS
// The PHP code had: <a href="dashboard.php" class="px-8 py-3 rounded-full border border-white/50 text-white hover:bg-white/10 transition-all font-bold text-xs tracking-wider uppercase shadow-sm">Dashboard</a>
// Replace with the single class attribute:
bodyContent = bodyContent.replace(
    /<a href="\.\.\/\.\.\/modules\/modul_1\/dashboard\.php" class="([^"]*)">Dashboard<\/a>/g,
    '<a href="/onboarding.html" id="dashboard-btn" class="cta-link $1">Dashboard</a>'
);

// Fallback in case path was different:
bodyContent = bodyContent.replace(
    /<a href="dashboard\.php" class="([^"]*)">Dashboard<\/a>/g,
    '<a href="/onboarding.html" id="dashboard-btn" class="cta-link $1">Dashboard</a>'
);

bodyContent = bodyContent.replace(
    /href="\.\.\/\.\.\/auth\/login\.php"/g,
    'href="/auth/login.html"'
);

bodyContent = bodyContent.replace(
    /href="dashboard\.php"/g,
    'href="/onboarding.html"'
);

bodyContent = bodyContent.replace(
    /<a href="\/onboarding\.html"(\s+)class="([^"]*)">([^<]*)<\/a>/g,
    '<a href="/onboarding.html" class="cta-link $2">$3</a>'
);

bodyContent = bodyContent.replace(/logo\.png/gi, 'Logo.png');
bodyContent = bodyContent.replace(/team-1\.jpg/gi, 'team-1.png');
bodyContent = bodyContent.replace(/team-2\.jpg/gi, 'team-2.png');
bodyContent = bodyContent.replace(/team-3\.jpg/gi, 'team-3.png');

fs.writeFileSync('d:/Codes/ruang-pulih/index.html', bodyContent);
console.log('Successfully recreated index.html!');
