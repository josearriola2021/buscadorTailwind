module.exports = {
  content: ["./**/*.{html,js}"],
  theme: {
    extend: {
      flex:{
        '2':'2 2 0%',
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
