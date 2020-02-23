const submissionList = document.querySelector("#Submisson-list");
//saving data
const form = document.querySelector("#add-Submission-form");
 

//create element and render submission

function renderSubmission(doc){
let li = document.createElement("li");
let class_taken = document.createElement("span");
//let exam_curved = document.createElement("span");
//let final_grade_curved = document.createElement("span");
let grade_received = document.createElement("span");
let professor = document.createElement("span");
let classAvg = document.createElement("span");
let cross = document.createElement("div");


if(doc.data().grade_received== 0.0 || //prevent invalid grades
   doc.data().grade_received== 0.3 ||
   doc.data().grade_received== 0.7 ||
   doc.data().grade_received== 1.0 ||
   doc.data().grade_received== 1.3 ||
   doc.data().grade_received== 1.7 ||
   doc.data().grade_received== 2.0 ||
   doc.data().grade_received== 2.3 ||
   doc.data().grade_received== 2.7 ||
   doc.data().grade_received== 3.0 ||
   doc.data().grade_received== 3.3 ||
   doc.data().grade_received== 3.7 ||
   doc.data().grade_received== 4.0 ||
   doc.data().grade_received == 0||
   doc.data().grade_received== 1 ||
   doc.data().grade_received== 2 ||
   doc.data().grade_received== 3 ||
   doc.data().grade_received== 4
 ) {
    li.setAttribute("data_id",doc.id);
    grade_received.textContent = "Grade Received: " + (Math.round( doc.data().grade_received* 100) / 100).toFixed(1);
    class_taken.textContent = "Class: " + doc.data().class_taken;
    //exam_curved.textContent = "Exam curved: " +doc.data().exam_curved;
    //final_grade_curved.textContent = "Final Grade Curved: " + doc.data().final_grade_curved;
    professor.textContent = "Professor: " + doc.data().professor;
    classAvg.textContent = "Class Average: " + doc.data().classAvg;
    cross.textContent = 'x';
    li.appendChild(class_taken);
    //li.appendChild(exam_curved);
    //li.appendChild(final_grade_curved);
    li.appendChild(grade_received);
    li.appendChild(professor);
    li.appendChild(cross);
    li.appendChild(classAvg);

    submissionList.appendChild(li);

    cross.addEventListener('click',(e) => {
        e.stopPropagation();
        let id = e.target.parentElement.getAttribute('data_id');
        db.collection("Submission").doc(id).delete();
    })
    }else{ 
    li.setAttribute("data_id",doc.id);
    cross.textContent = 'Null';
    li.appendChild(cross);
    submissionList.appendChild(li);
    cross.addEventListener('click',(e) => {
        e.stopPropagation();
        let id = e.target.parentElement.getAttribute('data_id');
        db.collection("Submission").doc(id).delete();})
    form.class_taken.value = "";
    form.professor.value = "";
    form.grade_received.value ="";
    alert("Your grade value is not considered valid");
    }
}

//getting data
// db.collection("Submission").get().then((snapshot) =>{
//     snapshot.docs.forEach(doc => {
//         renderSubmission(doc);
//        console.log(doc.data());

//     })
// });


//saving data 
form.addEventListener("submit", (e)=>{
    e.preventDefault();//prevent default action
    db.collection("Submission").add({
        class_taken : form.class_taken.value,
        professor : form.professor.value,
        grade_received: form.grade_received.value,
        classAvg: form.grade.class_avg
    });
    form.class_taken.value = "";
    form.professor.value = "";
    form.grade_received.value ="";

});

//Listener for real-time implementation
 db.collection('Submission').orderBy('class_taken').orderBy('professor').onSnapshot(snapshot => {
    let changes = snapshot.docChanges();
    changes.forEach(change=> {
        console.log(change.doc.data())
        if(change.type == 'added'){
            renderSubmission(change.doc)
        } else if (change.type == 'removed'){
            let li = submissionList.querySelector('[data_id=' + change.doc.id + ']' );
            submissionList.removeChild(li); 
        }
    })

 });
