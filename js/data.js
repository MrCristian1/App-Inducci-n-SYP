/**
 * Estructura de datos para la plataforma de inducción
 * Contiene la información de cada nivel, preguntas y respuestas
 */

const inductionData = {
    // Configuración general
    config: {
        companyName: "Solutions and Payroll",
        totalLevels: 5,
        requiredCorrectAnswers: 3, // Mínimo de respuestas correctas para pasar un nivel
    },
    
    // Datos de los niveles
    levels: [
        {
            id: 1,
            title: "Políticas de la empresa",
            icon: "fa-book-open",
            content: `
                <h3>Políticas de Solutions and Payroll</h3>
                <p>En Solutions and Payroll, nuestras políticas están diseñadas para crear un ambiente de trabajo productivo, seguro y respetuoso para todos los colaboradores.</p>
                
                <h4>Política de Horario Laboral</h4>
                <p>Nuestro horario de trabajo es de lunes a viernes de 8:00 AM a 5:00 PM, con una hora de almuerzo. Valoramos la puntualidad como muestra de respeto hacia nuestros compañeros y clientes.</p>
                
                <h4>Política de Vestimenta</h4>
                <p>Mantenemos un código de vestimenta business casual que proyecta una imagen profesional mientras permite comodidad. Los viernes son días de vestimenta casual.</p>
                
                <h4>Política de Confidencialidad</h4>
                <p>Toda la información de clientes y de la empresa debe ser tratada con estricta confidencialidad. La violación de esta política puede resultar en acciones disciplinarias.</p>
                
                <button id="show-quiz-btn" class="btn-primary">Continuar al Quiz</button>
            `,
            quiz: [
                {
                    question: "¿Cuál es el horario laboral de Solutions and Payroll?",
                    options: [
                        "De 9:00 AM a 6:00 PM de lunes a viernes",
                        "De 8:00 AM a 5:00 PM de lunes a viernes",
                        "De 8:30 AM a 5:30 PM de lunes a viernes",
                        "De 8:00 AM a 5:00 PM de lunes a sábado"
                    ],
                    correctAnswer: 1
                },
                {
                    question: "¿Qué tipo de código de vestimenta se maneja en la empresa?",
                    options: [
                        "Formal todos los días",
                        "Casual todos los días",
                        "Business casual con viernes casual",
                        "No hay código de vestimenta"
                    ],
                    correctAnswer: 2
                },
                {
                    question: "¿Qué puede ocurrir si se viola la política de confidencialidad?",
                    options: [
                        "Una advertencia verbal",
                        "Nada, es solo una sugerencia",
                        "Acciones disciplinarias",
                        "Una multa económica"
                    ],
                    correctAnswer: 2
                },
                {
                    question: "¿Cuál es el propósito principal de las políticas de la empresa?",
                    options: [
                        "Restringir la libertad de los empleados",
                        "Crear un ambiente de trabajo productivo, seguro y respetuoso",
                        "Cumplir con requisitos legales únicamente",
                        "Establecer jerarquías claras entre departamentos"
                    ],
                    correctAnswer: 1
                },
                {
                    question: "¿Qué valor se menciona específicamente en relación con el horario laboral?",
                    options: [
                        "Flexibilidad",
                        "Puntualidad",
                        "Productividad",
                        "Compromiso"
                    ],
                    correctAnswer: 1
                }
            ],
            achievement: {
                name: "Experto en Políticas",
                icon: "fa-scroll",
                description: "¡Has demostrado conocer las políticas fundamentales de Solutions and Payroll!"
            }
        },
        {
            id: 2,
            title: "Funciones de la empresa",
            icon: "fa-tasks",
            content: `
                <h3>Funciones de Solutions and Payroll</h3>
                <p>Solutions and Payroll se especializa en brindar soluciones integrales de gestión de nómina y recursos humanos para empresas de todos los tamaños.</p>
                
                <h4>Gestión de Nómina</h4>
                <p>Ofrecemos servicios completos de procesamiento de nómina, incluyendo cálculo de salarios, deducciones, impuestos y generación de reportes para cumplimiento legal.</p>
                
                <h4>Administración de Recursos Humanos</h4>
                <p>Brindamos soporte en reclutamiento, selección, onboarding, evaluación de desempeño y desarrollo de talento para optimizar el capital humano de nuestros clientes.</p>
                
                <h4>Consultoría Laboral</h4>
                <p>Asesoramos a las empresas en materia de legislación laboral, contratos, prestaciones y obligaciones patronales para garantizar el cumplimiento normativo.</p>
                
                <h4>Tecnología HR</h4>
                <p>Implementamos soluciones tecnológicas que automatizan y optimizan los procesos de recursos humanos, mejorando la eficiencia operativa de nuestros clientes.</p>
                
                <button id="show-quiz-btn" class="btn-primary">Continuar al Quiz</button>
            `,
            quiz: [
                {
                    question: "¿Cuál es una de las principales funciones de Solutions and Payroll?",
                    options: [
                        "Desarrollo de software para videojuegos",
                        "Gestión de nómina y recursos humanos",
                        "Servicios de marketing digital",
                        "Consultoría financiera para inversiones"
                    ],
                    correctAnswer: 1
                },
                {
                    question: "¿Qué incluye el servicio de procesamiento de nómina?",
                    options: [
                        "Solo el cálculo de salarios básicos",
                        "Únicamente la generación de reportes",
                        "Cálculo de salarios, deducciones, impuestos y reportes",
                        "Exclusivamente el pago de impuestos"
                    ],
                    correctAnswer: 2
                },
                {
                    question: "¿En qué área brinda soporte la Administración de Recursos Humanos?",
                    options: [
                        "Solo en reclutamiento",
                        "Únicamente en evaluación de desempeño",
                        "En reclutamiento, selección, onboarding, evaluación y desarrollo",
                        "Exclusivamente en compensaciones"
                    ],
                    correctAnswer: 2
                },
                {
                    question: "¿Qué tipo de consultoría ofrece la empresa?",
                    options: [
                        "Consultoría de marketing",
                        "Consultoría laboral",
                        "Consultoría financiera",
                        "Consultoría de operaciones"
                    ],
                    correctAnswer: 1
                },
                {
                    question: "¿Cuál es el propósito de implementar soluciones tecnológicas HR?",
                    options: [
                        "Reemplazar al personal de recursos humanos",
                        "Complicar los procesos administrativos",
                        "Automatizar y optimizar procesos para mejorar la eficiencia",
                        "Únicamente cumplir con requisitos legales"
                    ],
                    correctAnswer: 2
                }
            ],
            achievement: {
                name: "Conocedor de Funciones",
                icon: "fa-briefcase",
                description: "¡Has comprendido las funciones clave que desempeña Solutions and Payroll en el mercado!"
            }
        },
        {
            id: 3,
            title: "Valores corporativos",
            icon: "fa-heart",
            content: `
                <h3>Valores Corporativos de Solutions and Payroll</h3>
                <p>Nuestros valores son el corazón de nuestra cultura organizacional y guían todas nuestras decisiones y acciones.</p>
                
                <h4>Integridad</h4>
                <p>Actuamos con honestidad, transparencia y ética en todas nuestras interacciones, tanto con clientes como entre compañeros.</p>
                
                <h4>Excelencia</h4>
                <p>Nos esforzamos constantemente por superar expectativas y ofrecer servicios de la más alta calidad, buscando la mejora continua.</p>
                
                <h4>Innovación</h4>
                <p>Fomentamos la creatividad y la búsqueda de soluciones novedosas para adaptarnos a un entorno empresarial en constante evolución.</p>
                
                <h4>Colaboración</h4>
                <p>Creemos en el poder del trabajo en equipo y la sinergia que se genera cuando combinamos nuestros talentos y perspectivas diversas.</p>
                
                <h4>Responsabilidad</h4>
                <p>Asumimos el compromiso con nuestras acciones y decisiones, respondiendo por sus resultados y aprendiendo de cada experiencia.</p>
                
                <button id="show-quiz-btn" class="btn-primary">Continuar al Quiz</button>
            `,
            quiz: [
                {
                    question: "¿Cuál de estos es un valor corporativo de Solutions and Payroll?",
                    options: [
                        "Competitividad agresiva",
                        "Integridad",
                        "Individualismo",
                        "Conformismo"
                    ],
                    correctAnswer: 1
                },
                {
                    question: "¿Qué implica el valor de la excelencia en la empresa?",
                    options: [
                        "Trabajar solo lo necesario",
                        "Superar expectativas y buscar mejora continua",
                        "Competir internamente entre compañeros",
                        "Mantener los procesos sin cambios"
                    ],
                    correctAnswer: 1
                },
                {
                    question: "¿Qué fomenta el valor de la innovación?",
                    options: [
                        "Mantener las tradiciones sin cambios",
                        "Seguir siempre los mismos procedimientos",
                        "La creatividad y búsqueda de soluciones novedosas",
                        "Evitar riesgos a toda costa"
                    ],
                    correctAnswer: 2
                },
                {
                    question: "¿En qué se basa el valor de la colaboración?",
                    options: [
                        "En el trabajo individual exclusivamente",
                        "En la competencia entre departamentos",
                        "En el poder del trabajo en equipo y la sinergia",
                        "En la jerarquía estricta"
                    ],
                    correctAnswer: 2
                },
                {
                    question: "¿Qué implica el valor de la responsabilidad?",
                    options: [
                        "Culpar a otros por los errores",
                        "Asumir compromiso con nuestras acciones y decisiones",
                        "Evitar tomar decisiones difíciles",
                        "Seguir órdenes sin cuestionamientos"
                    ],
                    correctAnswer: 1
                }
            ],
            achievement: {
                name: "Embajador de Valores",
                icon: "fa-gem",
                description: "¡Has interiorizado los valores fundamentales que nos definen como organización!"
            }
        },
        {
            id: 4,
            title: "Comités internos",
            icon: "fa-users",
            content: `
                <h3>Comités Internos de Solutions and Payroll</h3>
                <p>Para fomentar la participación y el bienestar de todos los colaboradores, contamos con diversos comités que trabajan en áreas específicas.</p>
                
                <h4>Comité de Bienestar</h4>
                <p>Se encarga de promover actividades recreativas, celebraciones y programas que mejoren la calidad de vida laboral y el clima organizacional.</p>
                
                <h4>Comité de Seguridad y Salud</h4>
                <p>Vela por mantener un entorno de trabajo seguro, implementando protocolos de prevención y atención de emergencias, así como programas de salud ocupacional.</p>
                
                <h4>Comité de Innovación</h4>
                <p>Impulsa la generación e implementación de ideas innovadoras que mejoren nuestros servicios y procesos internos, fomentando la participación de todos los colaboradores.</p>
                
                <h4>Comité de Responsabilidad Social</h4>
                <p>Coordina las iniciativas de impacto social y ambiental de la empresa, promoviendo el voluntariado corporativo y prácticas sostenibles.</p>
                
                <h4>Comité de Ética</h4>
                <p>Supervisa el cumplimiento del código de ética y valores corporativos, atendiendo consultas y situaciones que requieran orientación en materia de conducta profesional.</p>
                
                <button id="show-quiz-btn" class="btn-primary">Continuar al Quiz</button>
            `,
            quiz: [
                {
                    question: "¿Qué comité se encarga de promover actividades recreativas y celebraciones?",
                    options: [
                        "Comité de Ética",
                        "Comité de Bienestar",
                        "Comité de Innovación",
                        "Comité de Seguridad y Salud"
                    ],
                    correctAnswer: 1
                },
                {
                    question: "¿Cuál es la función principal del Comité de Seguridad y Salud?",
                    options: [
                        "Organizar fiestas corporativas",
                        "Implementar nuevas tecnologías",
                        "Mantener un entorno de trabajo seguro",
                        "Coordinar actividades de voluntariado"
                    ],
                    correctAnswer: 2
                },
                {
                    question: "¿Qué impulsa el Comité de Innovación?",
                    options: [
                        "La generación e implementación de ideas innovadoras",
                        "El cumplimiento estricto de las normas tradicionales",
                        "La reducción de costos operativos únicamente",
                        "La competencia entre departamentos"
                    ],
                    correctAnswer: 0
                },
                {
                    question: "¿Qué coordina el Comité de Responsabilidad Social?",
                    options: [
                        "Las políticas de recursos humanos",
                        "Las iniciativas de impacto social y ambiental",
                        "Los procesos de reclutamiento",
                        "Las estrategias de marketing"
                    ],
                    correctAnswer: 1
                },
                {
                    question: "¿Qué supervisa el Comité de Ética?",
                    options: [
                        "El presupuesto de la empresa",
                        "Las actividades recreativas",
                        "El cumplimiento del código de ética y valores corporativos",
                        "Los horarios de trabajo"
                    ],
                    correctAnswer: 2
                }
            ],
            achievement: {
                name: "Experto en Comités",
                icon: "fa-users-cog",
                description: "¡Has aprendido sobre los comités que hacen de Solutions and Payroll un gran lugar para trabajar!"
            }
        },
        {
            id: 5,
            title: "Jerarquía y estructura organizacional",
            icon: "fa-sitemap",
            content: `
                <h3>Jerarquía y Estructura Organizacional de Solutions and Payroll</h3>
                <p>Nuestra estructura está diseñada para facilitar la comunicación, la toma de decisiones y el desarrollo profesional de todos los colaboradores.</p>
                
                <h4>Dirección General</h4>
                <p>Liderada por el CEO y el equipo directivo, establece la visión estratégica y los objetivos a largo plazo de la organización.</p>
                
                <h4>Gerencias de Área</h4>
                <p>Incluyen las gerencias de Operaciones, Comercial, Recursos Humanos, Finanzas y Tecnología, cada una responsable de sus respectivos departamentos y procesos.</p>
                
                <h4>Coordinaciones</h4>
                <p>Nivel intermedio que supervisa equipos específicos dentro de cada área, asegurando la implementación efectiva de procesos y proyectos.</p>
                
                <h4>Especialistas y Analistas</h4>
                <p>Profesionales con conocimientos técnicos específicos que ejecutan las operaciones diarias y brindan soporte especializado a clientes internos y externos.</p>
                
                <h4>Asistentes y Auxiliares</h4>
                <p>Brindan apoyo operativo y administrativo a los diferentes niveles de la organización, contribuyendo al funcionamiento eficiente de los procesos.</p>
                
                <button id="show-quiz-btn" class="btn-primary">Continuar al Quiz</button>
            `,
            quiz: [
                {
                    question: "¿Quién lidera la Dirección General de la empresa?",
                    options: [
                        "Los gerentes de área",
                        "El CEO y el equipo directivo",
                        "Los coordinadores",
                        "Los especialistas"
                    ],
                    correctAnswer: 1
                },
                {
                    question: "¿Qué gerencias se mencionan en la estructura organizacional?",
                    options: [
                        "Solo Recursos Humanos y Finanzas",
                        "Únicamente Operaciones y Comercial",
                        "Operaciones, Comercial, Recursos Humanos, Finanzas y Tecnología",
                        "Marketing, Ventas y Producción"
                    ],
                    correctAnswer: 2
                },
                {
                    question: "¿Cuál es la función de las Coordinaciones en la estructura?",
                    options: [
                        "Establecer la visión estratégica",
                        "Supervisar equipos específicos y asegurar implementación de procesos",
                        "Brindar apoyo operativo únicamente",
                        "Definir el presupuesto anual"
                    ],
                    correctAnswer: 1
                },
                {
                    question: "¿Qué rol desempeñan los Especialistas y Analistas?",
                    options: [
                        "Lideran la organización",
                        "Supervisan a los gerentes",
                        "Ejecutan operaciones diarias y brindan soporte especializado",
                        "Solo tareas administrativas básicas"
                    ],
                    correctAnswer: 2
                },
                {
                    question: "¿Cuál es la contribución de los Asistentes y Auxiliares?",
                    options: [
                        "Establecen la estrategia de la empresa",
                        "Supervisan a los especialistas",
                        "Brindan apoyo operativo y administrativo",
                        "Definen los procesos técnicos"
                    ],
                    correctAnswer: 2
                }
            ],
            achievement: {
                name: "Maestro Organizacional",
                icon: "fa-sitemap",
                description: "¡Has comprendido la estructura que sostiene y hace funcionar a Solutions and Payroll!"
            }
        }
    ],
    
    // Logros finales al completar todos los niveles
    finalAchievement: {
        name: "Inducción Completada",
        icon: "fa-award",
        description: "¡Felicidades! Has completado exitosamente tu proceso de inducción en Solutions and Payroll. Ahora estás listo para formar parte de nuestro equipo con todos los conocimientos necesarios."
    }
};