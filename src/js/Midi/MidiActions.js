export const INCOMMING = 'midi/INCOMMING';
export const PROCESSED = 'midiPROCESSED';

export function onMidiMessage(event) {
    return {
        type: INCOMMING,
        event
    };
};

export function onProcessMidiMessage() {
    return {
        type: PROCESSED,
    };
};
