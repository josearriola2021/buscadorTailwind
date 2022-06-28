module.exports = {
  content: ["./**/*.{html,js}"],
  theme: {
    extend: {
      flex:{
        '2':'2 2 0%',
        '3':'3 3 0%',
        '4':'4 4 0%',
        '5':'5 5 0%',
        '6':'6 6 0%',
        '7':'7 7 0%',
        '8':'8 8 0%',
        '9':'9 9 0%',
      },
      keyframes:{
        despliegueAbrir:{
        '0%':{left:'-100%'},
        '100%':{left:'0%'},
      },
        despliegueCerrar:{
        '0%':{left:'0%'},
        '100%':{left:'-100%'},
      },
    },
    animation:{
      despliegueAbrir:'despliegueAbrir 0.7s ease-in-out',
      despliegueCerrar:'despliegueCerrar 0.7s ease-in-out',
    }
    },
  },
  plugins: [require("daisyui")],
}
