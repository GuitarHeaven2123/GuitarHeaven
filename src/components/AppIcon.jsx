import {
  Drum,
  Guitar,
  Headphones,
  Keyboard,
  Mic,
  Music,
  Piano,
  Radio,
  SlidersHorizontal,
  Volume2,
  Waves,
} from 'lucide-react';

export default function AppIcon({ category = '', size = 24, strokeWidth = 1.8, className = '' }) {
  let Icon = Music;

  if (/guitarra|bajo|ukulele|mandolina|banjo|sitar|cejilla|cuerdas/i.test(category)) Icon = Guitar;
  else if (/piano|teclado|sintetizador|órgano|organ|controlador midi/i.test(category)) Icon = Piano;
  else if (/batería|bateria|percusión|percusion|platillo|marimba|xilófono|xilofono|tabla/i.test(category)) Icon = Drum;
  else if (/saxofón|saxofon|clarinete|trompeta|trombón|trombon|tuba|flauta|armónica|armonica|melodica/i.test(category)) Icon = Volume2;
  else if (/violín|violin|cello|contrabajo|arpa/i.test(category)) Icon = Waves;
  else if (/micrófono|microfono|grabadora/i.test(category)) Icon = Mic;
  else if (/audífono|audifono|sampler|controlador dj/i.test(category)) Icon = Headphones;
  else if (/pedal|pedalera/i.test(category)) Icon = SlidersHorizontal;
  else if (/amplificador|radio/i.test(category)) Icon = Radio;
  else if (/interfaz|grabación|grabacion/i.test(category)) Icon = Keyboard;

  return <Icon size={size} strokeWidth={strokeWidth} className={className} aria-hidden="true" />;
}
