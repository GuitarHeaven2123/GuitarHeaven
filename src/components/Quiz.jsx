import { useState } from 'react';
import {
  Award, BarChart3, BookOpen, CheckCircle2, CircleDollarSign, Clock3,
  Dices, Drum, Guitar, Headphones, Heart, Home, Lightbulb,
  Music, Piano, RotateCcw, Sparkles, Target, Trophy, Users, Waves,
} from 'lucide-react';
import AppIcon from './AppIcon.jsx';

function QuizIcon({ emoji, size = 24 }) {
  const iconProps = { size, strokeWidth: 1.8, 'aria-hidden': true };
  const iconMap = {
    '🎵': Music, '🎸': Guitar, '🎹': Piano, '🥁': Drum, '🎧': Headphones,
    '🎼': Music, '✨': Sparkles, '💃': Users, '🤷': Users, '📊': BarChart3,
    '🐣': Sparkles, '🌱': Heart, '🌿': Waves, '🌳': Award, '💰': CircleDollarSign,
    '💵': CircleDollarSign, '💸': CircleDollarSign, '💎': Award, '👑': Trophy,
    '🏠': Home, '🏡': Home, '👥': Users, '🎤': Headphones, '🏫': BookOpen,
    '⚡': Lightbulb, '☀️': Lightbulb, '🔥': Lightbulb, '🎷': Waves,
    '🎻': Waves, '🎲': Dices, '⏰': Clock3, '🌅': Sparkles, '🤘': Guitar,
  };
  const Icon = iconMap[emoji] || Target;
  return <Icon {...iconProps} />;
}

const questions = [
  {
    id: 1,
    question: '¿Qué tipo de música te gusta más?',
    emoji: '🎵',
    options: [
      { label: 'Rock / Metal', value: 'rock', emoji: '🤘' },
      { label: 'Pop / Electrónica', value: 'pop', emoji: '✨' },
      { label: 'Jazz / Blues', value: 'jazz', emoji: '🎷' },
      { label: 'Clásica / Académica', value: 'classical', emoji: '🎼' },
      { label: 'Latina / Folclórica', value: 'latin', emoji: '💃' },
      { label: 'Sin preferencia aún', value: 'none', emoji: '🤷' },
    ],
  },
  {
    id: 2,
    question: '¿Cuál es tu nivel de experiencia musical?',
    emoji: '📊',
    options: [
      { label: 'Nunca he tocado nada', value: 'zero', emoji: '🐣' },
      { label: 'Principiante (menos de 1 año)', value: 'beginner', emoji: '🌱' },
      { label: 'Intermedio (1-3 años)', value: 'intermediate', emoji: '🌿' },
      { label: 'Avanzado (más de 3 años)', value: 'advanced', emoji: '🌳' },
    ],
  },
  {
    id: 3,
    question: '¿Cuánto estás dispuesto a invertir?',
    emoji: '💰',
    options: [
      { label: 'Menos de $3,000 MXN', value: 'budget', emoji: '💵' },
      { label: '$3,000 - $10,000 MXN', value: 'mid', emoji: '💸' },
      { label: '$10,000 - $30,000 MXN', value: 'high', emoji: '💎' },
      { label: 'Más de $30,000 MXN', value: 'premium', emoji: '👑' },
    ],
  },
  {
    id: 4,
    question: '¿Dónde vas a tocar principalmente?',
    emoji: '🏠',
    options: [
      { label: 'En casa / practicar solo', value: 'home', emoji: '🏡' },
      { label: 'Con amigos / jam sessions', value: 'jam', emoji: '👥' },
      { label: 'En bandas / toques', value: 'band', emoji: '🎤' },
      { label: 'Clases / academia', value: 'school', emoji: '🏫' },
    ],
  },
  {
    id: 5,
    question: '¿Qué te llama más la atención?',
    emoji: '✨',
    options: [
      { label: 'El sonido eléctrico y la distorsión', value: 'electric', emoji: '⚡' },
      { label: 'El sonido natural y orgánico', value: 'acoustic', emoji: '🌿' },
      { label: 'Los ritmos y la percusión', value: 'rhythm', emoji: '🥁' },
      { label: 'Las melodías y harmonías complejas', value: 'harmony', emoji: '🎼' },
      { label: 'La producción y los beats', value: 'production', emoji: '🎧' },
    ],
  },
  {
    id: 6,
    question: '¿Tienes alguna preferencia de instrumento?',
    emoji: '🎸',
    options: [
      { label: 'Guitarra (eléctrica o acústica)', value: 'guitar', emoji: '🎸' },
      { label: 'Piano o teclado', value: 'piano', emoji: '🎹' },
      { label: 'Batería o percusión', value: 'drums', emoji: '🥁' },
      { label: 'Instrumento de viento', value: 'wind', emoji: '🎷' },
      { label: 'Instrumento de cuerda clásica', value: 'strings', emoji: '🎻' },
      { label: 'Sorpréndeme', value: 'surprise', emoji: '🎲' },
    ],
  },
  {
    id: 7,
    question: '¿Cuánto tiempo al día puedes practicar?',
    emoji: '⏰',
    options: [
      { label: 'Menos de 15 minutos', value: 'minimal', emoji: '⚡' },
      { label: '15-30 minutos', value: 'light', emoji: '🌅' },
      { label: '30-60 minutos', value: 'moderate', emoji: '☀️' },
      { label: 'Más de 1 hora', value: 'intensive', emoji: '🔥' },
    ],
  },
];

const results = {
  electricGuitar: {
    name: 'Guitarra Eléctrica',
    emoji: '🎸',
    description: 'Eres un rockero en potencia. La guitarra eléctrica te dará el poder de expresarte a través del rock, metal, blues o cualquier género con distorsión y efectos. Es versátil, emocionante y el instrumento más popular del mundo.',
    suggestions: ['Fender Stratocaster Player', 'Gibson Les Paul Standard', 'Ibanez RG550', 'Epiphone Les Paul'],
    color: '#ef4444',
    nextSteps: ['Aprende los acordes básicos', 'Consigue un amplificador pequeño', 'Explora pedales de efectos'],
  },
  acousticGuitar: {
    name: 'Guitarra Acústica',
    emoji: '🪕',
    description: 'Tienes el alma de un cantautor. La guitarra acústica es perfecta para ti: no necesita amplificador, suena hermosa sola y es el mejor punto de inicio para acompañar canciones y tocar en cualquier lugar.',
    suggestions: ['Yamaha FG800', 'Fender CD-60S', 'Taylor Academy 12', 'Seagull S6 Original'],
    color: '#f97316',
    nextSteps: ['Aprende acordes abiertos G, C, D, Am, Em', 'Practica el rasgueo', 'Aprende tu primera canción'],
  },
  classicalGuitar: {
    name: 'Guitarra Clásica',
    emoji: '🎸',
    description: 'Tienes el perfil de un músico académico. La guitarra clásica te abrirá las puertas de la música clásica, el flamenco y la técnica más refinada. Requiere disciplina pero los resultados son espectaculares.',
    suggestions: ['Yamaha CG122MS', 'Cordoba C5', 'Alhambra 3C', 'Fender CN-60S'],
    color: '#8b5cf6',
    nextSteps: ['Estudia la técnica de mano derecha', 'Aprende leer partituras', 'Busca un maestro clásico'],
  },
  piano: {
    name: 'Piano / Teclado',
    emoji: '🎹',
    description: 'El piano es el instrumento más completo del mundo. Te ayudará a entender la teoría musical de forma visual, es perfecto para componer y complementa cualquier otro instrumento que quieras aprender después.',
    suggestions: ['Roland FP-30X', 'Yamaha P-125', 'Casio CT-X700', 'Korg B2'],
    color: '#3b82f6',
    nextSteps: ['Aprende a leer notas en clave de Sol y Fa', 'Practica escalas y arpegios', 'Aprende tu primera pieza clásica'],
  },
  drums: {
    name: 'Batería / Percusión',
    emoji: '🥁',
    description: '¡Eres el corazón del ritmo! La batería es el instrumento más físico y energético. Si te gustan los ritmos, la coordinación y ser la base de cualquier banda, la batería es para ti. También puedes empezar con cajón si buscas algo más compacto.',
    suggestions: ['Alesis Nitro Mesh Kit', 'Pearl Export EXX', 'Pearl Cajon PBC507', 'Tama Imperialstar'],
    color: '#10b981',
    nextSteps: ['Aprende el patrón de rock básico', 'Practica con metrómo', 'Estudia los rudimentos de batería'],
  },
  saxophone: {
    name: 'Saxofón',
    emoji: '🎷',
    description: 'Tienes el espíritu del jazz y el soul. El saxofón es un instrumento expressivo, sensual y lleno de personalidad. Es ideal para jazz, blues, pop y música latina. Aprenderlo es un viaje increíble.',
    suggestions: ['Jupiter JAS-500Q', 'Yamaha YAS-280', 'Stagg WS-AS215'],
    color: '#eab308',
    nextSteps: ['Aprende a producir un tono estable', 'Estudia las escalas de blues', 'Escucha a Charlie Parker y John Coltrane'],
  },
  violin: {
    name: 'Violín',
    emoji: '🎻',
    description: 'Eres una persona apasionada por la música clásica y la precisión. El violín es uno de los instrumentos más expresivos del mundo, aunque requiere dedicación para dominar la afinación. Los resultados son emocionantes.',
    suggestions: ['Stentor Student II', 'Cremona SV-500', 'Yamaha V3SKA Set'],
    color: '#ec4899',
    nextSteps: ['Estudia la postura y la técnica del arco', 'Aprende las primeras posiciones', 'Busca un maestro de violín'],
  },
  ukulele: {
    name: 'Ukulele',
    emoji: '🪕',
    description: 'Eres una persona creativa y alegre. El ukulele es el instrumento más accesible y divertido para comenzar. Aprenderás acordes en días y podrás tocar canciones completas muy rápido. ¡Perfecto para cualquier edad!',
    suggestions: ['Kala KA-15T', 'Cordoba C5 SP Uke', 'Lanikai LU-21C'],
    color: '#14b8a6',
    nextSteps: ['Aprende los acordes C, G, Am, F', 'Practica el rasgueo básico', 'Aprende "Somewhere Over the Rainbow"'],
  },
  dj: {
    name: 'Controlador DJ',
    emoji: '🎧',
    description: 'Eres el artista de la electrónica moderna. Si te apasionan los beats, la producción y la música electrónica, el mundo del DJ es para ti. Con un controlador básico puedes comenzar a crear y mezclar música hoy mismo.',
    suggestions: ['Pioneer DDJ-400', 'Numark Mixtrack Pro FX', 'Reloop Beatmix 4 MK2'],
    color: '#a855f7',
    nextSteps: ['Aprende a usar Rekordbox o Serato', 'Practica el beatmatching', 'Construye tu primera playlist de mixing'],
  },
  harmonica: {
    name: 'Armónica',
    emoji: '🎵',
    description: '¡Eres práctico e inteligente! La armónica es el instrumento más portable del mundo, cabe en tu bolsillo y suena increíble. Perfecta para blues, folk y rock. Se puede aprender rápido y lleva toda una vida perfeccionar.',
    suggestions: ['Hohner Special 20', 'Suzuki HA-20', 'Lee Oskar Major Diatonic'],
    color: '#06b6d4',
    nextSteps: ['Aprende a tocar notas simples por soplo/aspiración', 'Practica los bends', 'Escucha a Little Walter y Bob Dylan'],
  },
};

function getResult(answers) {
  // Scoring algorithm
  const scores = {
    electricGuitar: 0,
    acousticGuitar: 0,
    classicalGuitar: 0,
    piano: 0,
    drums: 0,
    saxophone: 0,
    violin: 0,
    ukulele: 0,
    dj: 0,
    harmonica: 0,
  };

  const { genre, level, budget, place, attraction, preference, time } = answers;

  // Genre influence
  if (genre === 'rock') { scores.electricGuitar += 4; scores.drums += 2; }
  if (genre === 'jazz') { scores.saxophone += 3; scores.piano += 3; scores.violin += 1; }
  if (genre === 'classical') { scores.classicalGuitar += 4; scores.piano += 3; scores.violin += 3; }
  if (genre === 'pop') { scores.piano += 3; scores.acousticGuitar += 2; scores.dj += 2; }
  if (genre === 'latin') { scores.acousticGuitar += 2; scores.saxophone += 2; scores.drums += 3; }
  if (genre === 'none') { scores.ukulele += 3; scores.harmonica += 2; scores.piano += 1; }

  // Level influence
  if (level === 'zero') { scores.ukulele += 4; scores.harmonica += 3; scores.piano += 1; }
  if (level === 'beginner') { scores.acousticGuitar += 2; scores.ukulele += 2; scores.piano += 2; }
  if (level === 'advanced') { scores.electricGuitar += 1; scores.violin += 2; scores.saxophone += 2; }

  // Budget
  if (budget === 'budget') { scores.ukulele += 3; scores.harmonica += 4; scores.acousticGuitar += 1; }
  if (budget === 'mid') { scores.acousticGuitar += 2; scores.electricGuitar += 2; scores.piano += 1; }
  if (budget === 'high') { scores.piano += 2; scores.drums += 2; scores.saxophone += 2; }
  if (budget === 'premium') { scores.violin += 2; scores.piano += 2; scores.saxophone += 1; }

  // Attraction
  if (attraction === 'electric') { scores.electricGuitar += 4; scores.dj += 2; }
  if (attraction === 'acoustic') { scores.acousticGuitar += 3; scores.classicalGuitar += 2; }
  if (attraction === 'rhythm') { scores.drums += 5; }
  if (attraction === 'harmony') { scores.piano += 4; scores.violin += 2; }
  if (attraction === 'production') { scores.dj += 5; scores.piano += 1; }

  // Preference
  if (preference === 'guitar') { scores.electricGuitar += 3; scores.acousticGuitar += 3; scores.classicalGuitar += 2; }
  if (preference === 'piano') { scores.piano += 5; }
  if (preference === 'drums') { scores.drums += 5; }
  if (preference === 'wind') { scores.saxophone += 4; }
  if (preference === 'strings') { scores.violin += 5; }
  if (preference === 'surprise') {
    scores.ukulele += 2; scores.harmonica += 2; scores.saxophone += 1;
  }

  // Time
  if (time === 'minimal') { scores.harmonica += 3; scores.ukulele += 2; }
  if (time === 'light') { scores.ukulele += 2; scores.acousticGuitar += 1; }
  if (time === 'intensive') { scores.violin += 2; scores.classicalGuitar += 2; scores.piano += 1; }

  const top = Object.entries(scores).sort((a, b) => b[1] - a[1]);
  return results[top[0][0]] || results.acousticGuitar;
}

export default function Quiz({ onNavigate }) {
  const [step, setStep] = useState(0); // 0 = intro, 1-7 = questions, 8 = result
  const [answers, setAnswers] = useState({});
  const [selected, setSelected] = useState(null);
  const [result, setResult] = useState(null);

  const questionKeys = ['genre', 'level', 'budget', 'place', 'attraction', 'preference', 'time'];

  const handleStart = () => { setStep(1); setAnswers({}); setResult(null); };

  const handleSelect = (value) => setSelected(value);

  const handleNext = () => {
    if (!selected) return;
    const key = questionKeys[step - 1];
    const newAnswers = { ...answers, [key]: selected };
    setAnswers(newAnswers);
    setSelected(null);

    if (step === questions.length) {
      setResult(getResult(newAnswers));
      setStep(8);
    } else {
      setStep(s => s + 1);
    }
  };

  const handlePrev = () => {
    if (step > 1) {
      setStep(s => s - 1);
      setSelected(answers[questionKeys[step - 2]] || null);
    }
  };

  const handleRestart = () => {
    setStep(0);
    setAnswers({});
    setSelected(null);
    setResult(null);
  };

  const progress = step >= 1 && step <= 7 ? (step / questions.length) * 100 : 0;

  return (
    <section className="quiz-section">
      <div className="section-header">
        <h2 className="section-title"><Target size={24} /> ¿Qué instrumento es para ti?</h2>
        <p className="section-subtitle">Responde 7 preguntas y descubre tu instrumento ideal</p>
      </div>

      {/* Intro */}
      {step === 0 && (
        <div className="quiz-intro">
          <div className="quiz-intro-emoji"><Music size={64} /></div>
          <h3>Encuentra tu instrumento perfecto</h3>
          <p>
            Con solo 7 preguntas, nuestro algoritmo analizará tu perfil musical, nivel, presupuesto y objetivos
            para recomendarte el instrumento más adecuado para ti.
          </p>
          <div className="quiz-features">
            {['7 preguntas rápidas', 'Resultado personalizado', 'Recomendaciones de productos', 'Pasos para comenzar'].map(f => (
              <div key={f} className="quiz-feature"><CheckCircle2 size={18} /> {f}</div>
            ))}
          </div>
          <button className="btn-primary large" onClick={handleStart}>
            <Target size={18} /> Comenzar el Quiz
          </button>
        </div>
      )}

      {/* Questions */}
      {step >= 1 && step <= 7 && (
        <div className="quiz-question-container">
          {/* Progress */}
          <div className="quiz-progress">
            <div className="progress-bar-bg">
              <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
            </div>
            <span className="progress-text">Pregunta {step} de {questions.length}</span>
          </div>

          <div className="question-card">
            <div className="question-emoji"><QuizIcon emoji={questions[step - 1].emoji} size={36} /></div>
            <h3 className="question-text">{questions[step - 1].question}</h3>

            <div className="options-grid">
              {questions[step - 1].options.map(opt => (
                <button
                  key={opt.value}
                  className={`option-btn ${selected === opt.value ? 'selected' : ''}`}
                  onClick={() => handleSelect(opt.value)}
                >
                  <span className="option-emoji"><QuizIcon emoji={opt.emoji} size={28} /></span>
                  <span className="option-label">{opt.label}</span>
                </button>
              ))}
            </div>

            <div className="quiz-nav">
              {step > 1 && (
                <button className="btn-secondary" onClick={handlePrev}>← Anterior</button>
              )}
              <button
                className="btn-primary"
                onClick={handleNext}
                disabled={!selected}
              >
                {step === questions.length ? <><Target size={16} /> Ver mi resultado</> : 'Siguiente →'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Result */}
      {step === 8 && result && (
        <div className="quiz-result">
          <div className="result-header" style={{ background: `linear-gradient(135deg, ${result.color}22, ${result.color}11)`, borderColor: result.color }}>
            <div className="result-emoji"><AppIcon category={result.name} size={58} /></div>
            <div className="result-crown"><Trophy size={16} /> Tu instrumento ideal es:</div>
            <h3 className="result-name" style={{ color: result.color }}>{result.name}</h3>
          </div>

          <p className="result-description">{result.description}</p>

          <div className="result-section">
            <h4><Guitar size={18} /> Productos recomendados para ti:</h4>
            <div className="suggestion-chips">
              {result.suggestions.map(s => (
                <span key={s} className="suggestion-chip" style={{ borderColor: result.color }}>
                  {s}
                </span>
              ))}
            </div>
          </div>

          <div className="result-section">
            <h4><BookOpen size={18} /> Próximos pasos:</h4>
            <ol className="next-steps">
              {result.nextSteps.map((step, i) => (
                <li key={i}>{step}</li>
              ))}
            </ol>
          </div>

          <div className="result-actions">
            <button
              className="btn-primary"
              onClick={() => onNavigate('catalog')}
            >
              <Guitar size={16} /> Ver {result.name} en el catálogo
            </button>
            <button className="btn-secondary" onClick={handleRestart}>
              <RotateCcw size={16} /> Repetir Quiz
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
