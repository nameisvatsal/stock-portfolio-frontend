import { useInView } from 'react-intersection-observer';
import { useSprings, config, animated } from '@react-spring/web';

interface BlurTextProps {
  text: string;
  delay?: number;
  className?: string;
  animateBy?: 'words' | 'letters';
  direction?: 'top' | 'bottom';
  animationFrom?: any;
  animationTo?: any;
  onAnimationComplete?: () => void;
}

const BlurText: React.FC<BlurTextProps> = ({
  text,
  delay = 100,
  className = '',
  animateBy = 'words',
  direction = 'top',
  animationFrom,
  animationTo,
  onAnimationComplete
}) => {
  const [ref, inView] = useInView({ triggerOnce: true });
  const elements = animateBy === 'words' ? text.split(' ') : text.split('');

  const defaultFrom = {
    opacity: 0,
    filter: 'blur(10px)',
    transform: direction === 'top' ? 'translateY(-20px)' : 'translateY(20px)'
  };

  const defaultTo = {
    opacity: 1,
    filter: 'blur(0px)',
    transform: 'translateY(0px)'
  };

  const springs = useSprings(
    elements.length,
    elements.map((_, i) => ({
      from: animationFrom || defaultFrom,
      to: inView
        ? async (next: (config: any) => void) => {
            await next({
              ...animationTo || defaultTo,
              delay: i * delay,
              config: {
                ...config.gentle,
                duration: 1000
              },
              onRest: () => {
                if (i === elements.length - 1 && onAnimationComplete) {
                  onAnimationComplete();
                }
              }
            });
          }
        : animationFrom || defaultFrom,
      config: {
        ...config.gentle,
        duration: 1000
      }
    }))
  );

  return (
    <span ref={ref} className={`inline-block ${className}`}>
      {springs.map((spring, i) => (
        <animated.span
          key={i}
          style={spring}
          className="inline-block"
        >
          {elements[i]}
          {animateBy === 'words' && i < elements.length - 1 ? ' ' : ''}
        </animated.span>
      ))}
    </span>
  );
};

export default BlurText; 