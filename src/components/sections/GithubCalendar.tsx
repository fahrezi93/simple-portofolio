import { useEffect, useState } from 'react';
import { GitHubCalendar } from 'react-github-calendar';

export function GithubCalendar({ username }: { username: string }) {
  const [isDark, setIsDark] = useState(typeof document !== 'undefined' ? document.documentElement.classList.contains('dark') : true);

  useEffect(() => {

    // Listen for theme toggle class changes on html tag
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          setIsDark(document.documentElement.classList.contains('dark'));
        }
      });
    });

    observer.observe(document.documentElement, { attributes: true });
    return () => observer.disconnect();
  }, []);



  return (
    <div className="w-full [&_article]:w-full [&_svg]:w-full [&_svg]:h-auto transition-colors duration-300">
      <GitHubCalendar 
        username={username} 
        colorScheme={isDark ? "dark" : "light"}
        theme={{
          light: ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'],
          dark: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'],
        }}
        fontSize={12}
        blockSize={12}
        blockMargin={4}
        blockRadius={2}
      />
    </div>
  );
}
