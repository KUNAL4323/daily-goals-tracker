const checkboxlist = document.querySelectorAll('.customcheckbox')
const allinputfields = document.querySelectorAll('.textinput')
const inputfields = document.querySelectorAll('.textinput')
const progressbar = document.querySelector('.progressbar')
const progressvaluee=document.querySelector('.progressvalue')
const progresslabel=document.querySelector('.progresslabel')
const allquoets=[
    'Raise the bar by completing your goals',
    'Well begun its half done!',
    'Just a step way keep going!',
    'Whoa!,you just completed all the goals,time for chill',
]
const allgoals=JSON.parse(localStorage.getItem('allgoals'))|| {
    first:{
        name:'',
        completed:false
    },
    second:{
        name:'',
        completed:false
    },
    third:{
        name:'',
        completed:false
    },
}
let completedgoalscount=Object.values(allgoals).filter((goal)=>goal.completed).length
progressvaluee.style.width=`${completedgoalscount/3*100}%`
progressvaluee.firstElementChild.innerText=`${completedgoalscount}/3 completed`
progresslabel.innerText=allquoets[completedgoalscount]
checkboxlist.forEach((checkbox) => {             //fuction(checkbox)we can acsess the checkbox all no of value are store in it
    checkbox.addEventListener('click', (e) => {   //there is no use of e but we write it beacuse it can be use in  for future
        const allfieldsfilled = [...allinputfields].every(function (input) {
            console.log(input.value);
            return input.value;
        })
        if (allfieldsfilled) {
            checkbox.parentElement.classList.toggle('completed')
            // progressvaluee.style.width ='33.33%'
            const InputId=checkbox.nextElementSibling.id
            allgoals[InputId].completed=!allgoals[InputId].completed
            completedgoalscount=Object.values(allgoals).filter((goal)=>goal.completed).length
            progressvaluee.style.width=`${completedgoalscount/3*100}%`
            progressvaluee.firstElementChild.innerText=`${completedgoalscount}/3 completed`
            progresslabel.innerText=allquoets[completedgoalscount]
            localStorage.setItem('allgoals',JSON.stringify(allgoals))
        }
        else {
            progressbar.classList.add('show-error')
        }
    })
})
inputfields.forEach((input) => {
    input.value=allgoals[input.id].name

    if(allgoals[input.id].completed){
        input.parentElement.classList.add('completed')
    }

    input.addEventListener('focus',() => {
        progressbar.classList.remove('show-error')
    })
    input.addEventListener('input',(e)=>{
        if(allgoals[input.id].completed){
        e.target.value=allgoals[input.id].name
        return
    }
        allgoals[input.id].name=input.value
        localStorage.setItem('allgoals',JSON.stringify(allgoals))
        // console.log(input.id);
    })
})

