import type { Locale } from "@/lib/i18n/translations";
import type { DiagnosticQuestion } from "./types";

type QuestionTranslation = {
  question: string;
  explanation?: string;
  options: Record<string, string>;
};

const englishQuestionTranslations: Record<string, QuestionTranslation> = {
  "motor-gira": { question: "What happens when you try to start the car?", explanation: "This helps us determine whether the issue is in the starting system or whether the engine cranks but does not start.", options: { "no-gira": "The engine does not crank", "gira-no-arranca": "The engine cranks but does not start", "arranca-apaga": "It starts and immediately shuts off", "no-se": "I am not sure" } },
  "identificar-sonido": { question: "When you turn the key, do you hear the engine make a repeated ‘rrr-rrr-rrr’ sound?", explanation: "The goal is to determine whether the engine is being turned by the starter motor.", options: { si: "Yes", no: "No", "no-estoy-seguro": "I am not sure" } },
  "no-gira": { question: "When you try to start it, what do you hear?", options: { clic: "A click is heard", nada: "Nothing is heard", "gira-lento": "The engine cranks very slowly" } },
  "gira-no-arranca": { question: "Can you hear the fuel pump for a few seconds when you turn the ignition on?", explanation: "The pump normally activates briefly when the ignition is switched on. This can help determine whether to investigate the fuel system.", options: { si: "Yes", no: "No", "no-estoy-seguro": "I am not sure" } },
  "fusible-bomba": { question: "Would you like to check the fuse related to the fuel pump first?", options: { si: "Yes", no: "Continue with the diagnosis" } },
  "check-engine": { question: "Does the Check Engine light come on when you turn the ignition on before starting?", options: { si: "Yes", no: "No", "no-estoy-seguro": "I am not sure" } },
  "rpm-arranque": { question: "If you have an OBD scanner, can you see RPM while trying to start?", explanation: "RPM information during cranking can help assess whether the ECU is receiving an engine-speed signal.", options: { "si-hay-rpm": "Yes, RPM appears", "no-hay-rpm": "No RPM appears", "sin-escaner": "I do not have a scanner" } },
  "momento-se-apaga": { question: "When does the engine stall most often?", explanation: "When it happens helps distinguish a starting issue from one that appears while stopping or driving.", options: { "poco-despues-arrancar": "It starts, but stalls after a few seconds", "al-detenerme": "When I stop or slow down", "en-movimiento": "While I am driving", "no-estoy-seguro": "I am not sure" } },
  "temperatura-motor": { question: "Does it happen mainly when the engine is cold?", explanation: "Do not make checks near belts, fans, or hot parts while the engine is running.", options: { si: "Yes, mainly when cold", no: "No, it also happens when the engine is warm", "no-estoy-seguro": "I am not sure" } },
  "se-mantiene-acelerado": { question: "If you keep the engine slightly revved while the car is stopped, does it remain running?", explanation: "Only make this observation with the vehicle stationary, transmission in neutral or park, and the parking brake applied.", options: { si: "Yes, it remains running", no: "No, it also stalls", "no-estoy-seguro": "I am not sure" } },
  "luz-tablero-se-apaga": { question: "Does any warning light come on before or after the engine stalls?", explanation: "Observe warning lights without taking attention away from driving. If the engine stalls while moving, prioritize stopping in a safe place.", options: { si: "Yes", no: "No", "no-estoy-seguro": "I am not sure" } },
  "sintoma-temperatura": { question: "What temperature warning do you observe?", explanation: "If you notice steam, a strong coolant smell, or a red warning, prioritize stopping safely. Do not open the cooling system when the engine is hot.", options: { "vapor-o-olor-intenso": "There is steam, smoke, or a strong smell", "advertencia-roja": "Temperature reached the red zone or there is a red warning", "temperatura-alta": "Temperature is higher than normal, but there is no steam", "no-estoy-seguro": "I am not sure" } },
  "cuando-sube-temperatura": { question: "When do you notice the temperature rising?", explanation: "Answer only based on what you have observed. Do not check the radiator, hoses, or fans while the engine is hot or running.", options: { "trafico-o-detenerme": "In traffic, when stopped, or at low speed", "en-cualquier-momento": "It also happens during normal driving", "no-estoy-seguro": "I am not sure" } },
  "riesgo-electrico": { question: "Is there a burning smell, smoke, sparks, or a very hot area?", explanation: "Do not touch wires, fuses, or hot components. These signs can indicate an electrical hazard.", options: { si: "Yes", no: "No", "no-estoy-seguro": "I am not sure" } },
  "alcance-falla-electrica": { question: "What do you mainly notice?", options: { "luz-bateria-o-falla-carga": "The battery or charging light came on", "pierde-alimentacion-en-marcha": "Lights or accessories fail while driving", "un-accesorio": "One accessory, light, or power outlet fails", "varias-cosas-o-no-se": "Several things fail, or I am not sure" } },
  "color-o-senal-tablero": { question: "What type of warning appears on the dashboard?", explanation: "Do not try to identify a warning light while driving. Stop in a safe place before checking the dashboard or manual.", options: { roja: "A red light or stop message", "check-parpadeando": "Check Engine is flashing", "check-fija": "Check Engine stays on", "otra-amarilla": "Another yellow or amber light", "no-se": "I am not sure" } },
  "tipo-de-fuga": { question: "What do you observe around the leak?", explanation: "Do not put your hands near hot parts, belts, or fans. Do not test the fluid with your skin or mouth.", options: { "humo-olor-combustible": "There is smoke, a strong fuel smell, or dripping near the engine", "liquido-rojo-temperatura": "There is a red warning, steam, or high temperature", "mancha-sin-otros-sintomas": "There is a stain or drip, without smoke or warnings", "no-estoy-seguro": "I am not sure" } },
  "momento-perdida-potencia": { question: "When do you notice the loss of power most?", explanation: "Do not perform acceleration tests on the road. Answer only based on what you have already observed while driving safely.", options: { "advertencia-o-humo": "There is a red warning, smoke, or a sudden loss of power", "al-acelerar-o-subida": "When accelerating, going uphill, or carrying a load", siempre: "Almost all the time", "no-estoy-seguro": "I am not sure" } },
  "cuando-tironea": { question: "When do the jerks or hesitations occur?", explanation: "Do not try to provoke the symptom or perform acceleration tests. Answer based on what you have already observed while driving safely.", options: { "perdida-control-advertencia": "There is major power loss, a flashing light, or a red warning", "al-acelerar": "Mainly when accelerating", "ralenti-o-detenerme": "At idle or when stopping", "no-estoy-seguro": "I am not sure" } },
  "tipo-ruido": { question: "How is the noise you observed?", explanation: "Do not try to reproduce the noise or get near moving parts. Answer only based on what you perceived while driving or with the vehicle safely stopped.", options: { "golpe-fuerte-o-control-anormal": "A loud impact, continuous rubbing, or abnormal brakes or steering", "motor-con-advertencia": "Engine noise together with a warning or intense vibration", "aparece-en-movimiento": "It appears mainly while the car is moving", "no-estoy-seguro": "I am not sure" } },
};

export function localizeQuestions(questions: DiagnosticQuestion[], locale: Locale) {
  if (locale !== "en") return questions;

  return questions.map((question) => {
    const translation = englishQuestionTranslations[question.id];
    if (!translation) return question;

    return {
      ...question,
      question: translation.question,
      explanation: translation.explanation,
      options: question.options.map((option) => ({
        ...option,
        label: translation.options[option.id] ?? option.label,
      })),
    };
  });
}
