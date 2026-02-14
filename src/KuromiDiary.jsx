import React, { useState, useEffect, useRef } from 'react';
import { QRCodeSVG } from 'qrcode.react';

export default function KuromiDiary() {
  const [code, setCode] = useState('');
  const [unlocked, setUnlocked] = useState(false);
  const [typingText, setTypingText] = useState('');
  const [hearts, setHearts] = useState([]);
  const [showQR, setShowQR] = useState(false);
  const scrollRef = useRef(null);

  const SECRET_CODE = "2024"; 
  const VIDEO_URL = "https://youtu.be/5FxoecxkH0o?si=M4nczmbZeHylT2DU"; 

  const finalMessage = `Desde el momento en que te miré por primera vez sabía que había algo en vos que simplemente no podía resistirme, creo fielmente que a partir de ese momento Dios empezó algo que hasta día de hoy casi 2 años después podemos ser testigos de su amor para con nosotros.

Siempre hay algo que me gusta recordar y es que en la Biblia se habla sobre el amor que todo lo sufre: "Todo lo sufre, todo lo cree, todo lo espera, todo lo soporta" (1 Corintios 13:7).

Si bien en este tiempo que ha pasado no mantuvimos comunicación, tuvimos un aprendizaje y desarrollo en distintas áreas: emocional, mental y espiritual. En este día que se celebra el amor y la amistad quiero celebrar tu valiosa compañía, paciencia, inteligencia, sabiduría y sobre todas las cosas tu amor hacia mi persona.

En esta nueva etapa de aprendizaje quiero poder aprender a amarte como nuestro Señor Jesús lo haría. Realmente durante mucho tiempo he pensado que hemos pasado por muchas cosas juntos y personales y aún así aquí estamos. No hay palabras para expresar el profundo amor y respeto que siento hacia vos, no hay otra mujer con la que quisiera pasar y disfrutar el resto de mis días en esta tierra mientras sirvo y amo al Señor.

No hay día en que no piense en la cual pueda verte en la misma mesa junto a mi familia y yo con la tuya, en poder estar en tu vida en cada logro importante que logres y por supuesto vos en los míos. Desde mi interior, mi corazón, mente y espíritu ha deseado una mujer que ame sobre todas las cosas a mi Dios y que ame a mi familia y a mí como el Señor lo hace; creo fielmente que vos serás esa mujer virtuosa de la que el Rey Salomón habla.

Declaro sobre tu vida la gracia, favor, amor y misericordia que el Señor ha derramado sobre tu vida, y sé que no te vas a ir de este mundo sin cumplir tu propósito en el Señor. Creo que la tristeza y sufrimiento que has pasado no se compara con la gloria y alegría que nos espera en esta próxima temporada. 

TE AMO DEMASIADO DANNA.`;

  const gothicIcons = ['❦', '❧', '☙', '🙶', '⚜', '✟'];

  useEffect(() => {
    const createHeart = () => {
      const id = Date.now() + Math.random();
      const randomLeft = Math.random() * 100;
      const randomDuration = Math.random() * 8 + 7;
      const randomSize = Math.random() * (1.8 - 0.8) + 0.8;
      const drift = (Math.random() * 300) + 50;
      const direction = Math.random() > 0.5 ? 1 : -1;
      const randomX = drift * direction;
      const randomRotation = (Math.random() - 0.5) * 500;
      const newHeart = { id, left: randomLeft, icon: gothicIcons[Math.floor(Math.random() * gothicIcons.length)], size: randomSize, duration: randomDuration, randomX, randomRotation };
      setHearts(prev => [...prev, newHeart]);
      setTimeout(() => setHearts(prev => prev.filter(h => h.id !== id)), (randomDuration * 1000));
    };
    const interval = setInterval(createHeart, 900);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (unlocked) {
      let i = 0;
      const interval = setInterval(() => {
        setTypingText(finalMessage.slice(0, i));
        i++;
        if (i > finalMessage.length) {
          clearInterval(interval);
          setShowQR(true);
        }
      }, 30);
      return () => clearInterval(interval);
    }
  }, [unlocked]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [typingText, showQR]);

  const checkCode = () => {
    if (code === SECRET_CODE) setUnlocked(true);
    else { alert("Código incorrecto."); setCode(''); }
  };

  return (
    <div className="min-h-screen bg-[#1a0f1a] flex items-center justify-center p-4 font-serif overflow-hidden relative">
      <div className="absolute inset-0 pointer-events-none z-0">
        {hearts.map((heart) => (
          <span key={heart.id} className="gothic-symbol animate-gothic-float absolute"
            style={{ left: `${heart.left}%`, bottom: '-10%', fontSize: `${heart.size}rem`, animationDuration: `${heart.duration}s`, '--random-x': `${heart.randomX}px`, '--random-rotation': `${heart.randomRotation}deg`, color: `hsl(0, 60%, 15%)`, opacity: 0.25 }}>
            {heart.icon}
          </span>
        ))}
      </div>

      <div className={`relative z-10 w-full transition-all duration-1000 mx-auto 
        ${unlocked ? 'md:max-w-4xl' : 'max-w-[340px]'}`}> 
        
       <img 
  src="./kuromi-1.png" 
  className="absolute -top-10 -left-4 sm:-left-6 w-16 h-16 sm:w-20 sm:h-20 object-contain z-30 animate-soft-float" 
  alt="Kuromi 1" 
/>
<img 
  src="./kuromi-2.png" 
  className="absolute -bottom-6 -right-4 sm:-right-6 w-16 h-16 sm:w-20 sm:h-20 object-contain z-30 animate-soft-float" 
  style={{ animationDelay: '0.5s' }} 
  alt="Kuromi 2" 
/>

        <div className="bg-[#2d1b2d]/98 backdrop-blur-xl border-2 border-[#5a3b5a] rounded-[2rem] p-4 sm:p-8 shadow-2xl">
          
          <h1 className="text-center text-lg sm:text-2xl font-bold text-[#d8bfd8] mb-4 tracking-[0.3em] uppercase italic border-b border-[#5a3b5a]/50 pb-3 font-['Pirata_One']">
            {!unlocked ? "Diario Secreto" : "Querida Danna..."}
          </h1>

          {!unlocked ? (
            <div className="max-w-[280px] mx-auto space-y-4 py-6">
              <div className="bg-[#1a0f1a] p-4 rounded-xl border border-pink-500/10 text-center">
                <div className="text-3xl tracking-[0.4em] font-mono text-pink-100">{code.padEnd(4, '—')}</div>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 'C', 0, 'OK'].map((btn) => (
                  <button key={btn} onClick={() => { if (btn === 'C') setCode(''); else if (btn === 'OK') checkCode(); else if (code.length < 4) setCode(c => c + btn); }}
                    className="h-10 bg-[#3d243d] hover:bg-[#5a3b5a] rounded-lg text-pink-100 font-bold active:scale-90 transition-transform">
                    {btn}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="animate-fade-in">

              <div ref={scrollRef} className="bg-[#1a0f1a]/30 p-4 sm:p-6 rounded-xl max-h-[60vh] sm:max-h-[400px] overflow-y-auto custom-scrollbar scroll-smooth">
                <p className="text-[#d8bfd8] leading-[1.7] italic text-sm sm:text-base text-justify font-medium whitespace-pre-line px-2">
                  {typingText}
                  <span className={`${showQR ? 'hidden' : 'animate-pulse'} inline-block ml-1 w-1.5 h-4 bg-pink-600`}></span>
                </p>

                {showQR && (
                  <div className="mt-12 flex flex-col items-center animate-fade-in border-t border-pink-500/10 pt-8 pb-4">
                    <p className="text-pink-300 text-xs mb-4 uppercase tracking-[0.3em] italic">Tengo algo más para vos...</p>
                    <div className="p-3 bg-white rounded-xl shadow-[0_0_20px_rgba(236,72,153,0.3)]">
                      <QRCodeSVG value={VIDEO_URL} size={140} fgColor="#1a0f1a" />
                    </div>
                    <p className="text-pink-400/60 text-[10px] mt-4 tracking-widest">ESCANEAME</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}