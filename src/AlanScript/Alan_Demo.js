// Use this sample to create your own voice commands
intent('open (the|) box', p => {
    p.play({command: "openBox"});
});

intent("close (the|) box", p => {
    p.play({command: "closeBox"});
});

const COLORS = "$(COLOR red|blue|green|white|orange|purple|pink|black)";

intent(`Change (the|) background (color|) to ${COLORS}`, p => {
    p.play({command: "changeBackground", payload: {color: p.COLOR.value}});
});

intent("react", p => {
    p.play({command: "react"})
})

// // Give Alan some knowledge about the world
// corpus(`
//     Hello, I'm Alan.
//     This is a demo application.
//     You can learn how to teach Alan useful skills.
//     I can teach you how to write Alan Scripts.
//     I can help you. I can do a lot of things. I can answer questions. I can do tasks.
//     But they should be relevant to this application.
//     I can help with this application.
//     I'm Alan. I'm a virtual assistant. I'm here to help you with applications.
//     This is a demo script. It shows how to use Alan.
//     You can create dialogs and teach me.
//     For example: I can help navigate this application.
// `);
