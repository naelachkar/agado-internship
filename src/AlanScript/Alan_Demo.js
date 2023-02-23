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
