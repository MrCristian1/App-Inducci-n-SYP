import React, { useState, useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import CompanyServicesQuiz from './CompanyServicesQuiz';

const adnSections = [
	{
		title: 'Identidad Corporativa',
		emoji: '🏢',
		color: 'bg-blue-700',
		description: '👉 Aquí se explica el “para qué existimos” y el rumbo que seguimos.',
		content: [
			{
				label: 'Visión (2030) 🌟',
				text: 'Lograr la consolidación de soluciones de Outsourcing en los mercados actuales, mejorando el desempeño de los clientes, con una cultura innovadora que impulse bienestar y crecimiento de los colaboradores.',
			},
			{
				label: 'Misión 🎯',
				text: 'Ayudar a los clientes a mejorar su desempeño mediante diseño y acompañamiento en la implementación de soluciones personalizadas de Back Office, con tecnología e innovación. Además, garantizar satisfacción de clientes y bienestar de colaboradores, construyendo relaciones de largo plazo, adaptándonos a los cambios del entorno.',
			},
			{
				label: 'Propósito 💡',
				text: 'Brindar tranquilidad para todos con soluciones tecnológicamente humanas, trabajando con integridad, confiabilidad, empatía y adaptabilidad para crear experiencias positivas.',
			},
		],
	},
	{
		title: 'Valores Fundamentales',
		emoji: '🧬',
		color: 'bg-green-700',
		description: '👉 Son el ADN de la organización, las reglas del juego.',
		content: [
			{ label: 'Integridad 🤝', text: 'honestidad, transparencia y ética en todo momento.' },
			{ label: 'Adaptabilidad 🔄', text: 'agilidad y aprendizaje continuo frente a cambios.' },
			{ label: 'Empatía 💖', text: 'comprender y respetar las necesidades de clientes y colaboradores.' },
			{ label: 'Confiabilidad 🛡️', text: 'responsabilidad, compromiso y cumplimiento de acuerdos.' },
		],
	},
	{
		title: 'Diferenciadores',
		emoji: '✨',
		color: 'bg-yellow-600',
		description: '👉 Lo que hace única a la empresa frente a la competencia.',
		content: [
			{ label: 'Acompañamiento 👥', text: 'interacción permanente con clientes para superar expectativas.' },
			{ label: 'Adaptabilidad 🔄', text: 'respuesta efectiva a cambios e imprevistos.' },
			{ label: 'Personalización 🛠️', text: 'diseño e implementación de soluciones a la medida.' },
		],
	},
	{
		title: 'Competencias S&P (por valor)',
		emoji: '📊',
		color: 'bg-purple-700',
		description: '👉 Cómo se aterrizan los valores en comportamientos observables.',
		content: [
			{ label: 'Integridad → Actúa con integridad 🤝', text: 'Capacidad para mantenerse dentro de normas éticas y morales; comunicación abierta y honesta incluso en situaciones difíciles.' },
			{ label: 'Confiabilidad → Demuestra competencia y sinceridad 🛡️', text: 'Responsabilidad en procesos y relaciones, generando confianza.' },
			{ label: 'Calidad en el trabajo 🏅', text: 'Conocimiento profundo de las áreas a cargo, generando credibilidad en clientes internos y externos.' },
			{ label: 'Empatía → Orientación al cliente 💖', text: 'Comprender y satisfacer necesidades, resolviendo problemas con actitud positiva y proactiva.' },
			{ label: 'Adaptabilidad → Adaptación al cambio 🔄', text: 'Ajustarse a contextos dinámicos, modificando conductas frente a dificultades o nueva información.' },
		],
	},
	{
		title: 'Competencias Transversales',
		emoji: '🔗',
		color: 'bg-teal-700',
		description: '👉 Atributos que se esperan en todos los roles dentro de la empresa.',
		content: [
			{ label: 'Actuar con integridad 🤝' },
			{ label: 'Mantener calidad en el trabajo 🏅' },
			{ label: 'Practicar la empatía 💖' },
			{ label: 'Adaptarse al cambio 🔄' },
		],
	},
	{
		title: 'Competencias según nivel',
		emoji: '📈',
		color: 'bg-pink-700',
		description: '👉 Lo que se espera según el nivel de responsabilidad en la organización.',
		content: [
			{ label: 'Estratégico 🧠', text: 'desarrollo de equipos de alto desempeño, pensamiento estratégico.' },
			{ label: 'Táctico 🗂️', text: 'liderazgo, pensamiento conceptual y analítico.' },
			{ label: 'Operativo ⚙️', text: 'orientación al logro, capacidad de aprendizaje, trabajo colaborativo.' },
		],
	},
];

const glassColors = {
	'bg-blue-700': 'bg-blue-500/40 backdrop-blur-lg',
	'bg-green-700': 'bg-green-500/40 backdrop-blur-lg',
	'bg-yellow-600': 'bg-yellow-400/40 backdrop-blur-lg',
	'bg-purple-700': 'bg-purple-500/40 backdrop-blur-lg',
	'bg-teal-700': 'bg-teal-400/40 backdrop-blur-lg',
	'bg-pink-700': 'bg-pink-400/40 backdrop-blur-lg',
};

const CompanyServicesLevel = () => {
	const navigate = useNavigate();
	const [activeSection, setActiveSection] = useState(0);
	const [showQuiz, setShowQuiz] = useState(false);

	const stars = useMemo(() => {
		return [...Array(50)].map((_, i) => ({
			id: i,
			left: Math.random() * 100,
			top: Math.random() * 100,
			duration: 2 + Math.random() * 3,
			delay: Math.random() * 2,
		}));
	}, []);

	const handleBackToServices = () => setShowQuiz(false);
	const handleQuizComplete = () => {};

	if (showQuiz) {
		return <CompanyServicesQuiz onBack={handleBackToServices} onComplete={handleQuizComplete} />;
	}

	const section = adnSections[activeSection];
	const glassClass = glassColors[section.color] || 'bg-white/20 backdrop-blur-lg';

	return (
		<div className="min-h-screen relative overflow-hidden">
			{/* Fondo fijo y estrellas */}
			<div className="fixed inset-0 -z-10 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
				{stars.map((star) => (
					<div
						key={star.id}
						className="absolute bg-white rounded-full animate-star-pulse"
						style={{
							left: `${star.left}%`,
							top: `${star.top}%`,
							width: '2px',
							height: '2px',
							animationDuration: `${star.duration}s`,
							animationDelay: `${star.delay}s`,
						}}
					/>
				))}
			</div>
			<div className="relative z-10 container mx-auto px-6 py-12">
				{/* Header */}
				<div className="text-center mb-12">
					<div className="flex items-center justify-between mb-6">
						<button
							onClick={() => navigate('/map')}
							className="flex items-center space-x-2 text-white hover:text-yellow-400 transition-colors"
						>
							<FontAwesomeIcon icon={faArrowLeft} />
							<span>Volver al mapa</span>
						</button>
						<div></div> {/* Spacer para centrar el título */}
					</div>
					<h1 className="text-4xl md:text-5xl font-bold text-white mb-4">El ADN de la Empresa</h1>
					<p className="text-xl text-gray-300 max-w-3xl mx-auto">
						Transformamos la gestión empresarial con soluciones innovadoras que impulsan el crecimiento y la
						eficiencia de tu organización
					</p>
				</div>
				{/* Layout principal */}
				<div className="grid grid-cols-1 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
					{/* Sidebar conceptual ADN */}
					<div className="lg:col-span-1 space-y-4">
						{adnSections.map((item, idx) => (
							<button
								key={idx}
								className={`w-full p-4 rounded-xl text-left font-semibold text-lg flex items-center gap-2 transition-colors ${
									activeSection === idx
										? item.color + ' text-white shadow-lg'
										: 'bg-white/10 text-white hover:' + item.color
								}`}
								onClick={() => setActiveSection(idx)}
							>
								<span>{item.emoji}</span>
								<span>{item.title}</span>
							</button>
						))}
					</div>
					{/* Conceptual div principal con animación y glassmorphism */}
					<div className="lg:col-span-3 flex flex-col items-center justify-start">
						<AnimatePresence mode="wait">
							<motion.div
								key={activeSection}
								initial={{ opacity: 0, x: -80 }}
								animate={{ opacity: 1, x: 0 }}
								exit={{ opacity: 0, x: 80 }}
								transition={{ duration: 0.5, type: 'spring' }}
								className={`w-full max-w-3xl rounded-2xl p-10 shadow-2xl ${glassClass} min-h-[420px] flex flex-col border border-white/20`}
								style={{ minWidth: '420px' }}
							>
								<div className="flex items-center gap-3 mb-4">
									<span className="text-3xl">{section.emoji}</span>
									<span className="font-bold text-2xl text-white">{section.title}</span>
								</div>
								<div className="mb-6 text-white text-lg">{section.description}</div>
								<div className="space-y-4">
									{section.content.map((c, i) => (
										<div key={i} className="bg-white/10 p-4 rounded-xl text-white">
											<span className="font-semibold text-xl block mb-1">{c.label}</span>
											{c.text && <span className="text-base text-gray-200">{c.text}</span>}
										</div>
									))}
								</div>
							</motion.div>
						</AnimatePresence>
						<button
							onClick={() => setShowQuiz(true)}
							className="mt-8 px-6 py-3 bg-purple-700 text-white font-bold rounded-xl shadow-lg hover:bg-purple-800 transition-colors text-lg self-center"
						>
							Iniciar trivia
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CompanyServicesLevel;
