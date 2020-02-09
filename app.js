const submissionList = document.querySelector("#Submisson-list");

//create element and render submission

function renderSubmission(doc){
let li = document.createElement("li");
let class_taken = document.createElement("span");
let exam_curved = document.createElement("span");
let final_grade_curved = document.createElement("span");
let grade_received = document.createElement("span");
let professor = document.createElement("span");

li.setAttribute("data_id",doc.id);
class_taken.textContent = "Class: " + doc.data().class_taken;
exam_curved.textContent = "Exam curved: " +doc.data().exam_curved;
final_grade_curved.textContent = "Final Grade Curved: " + doc.data().final_grade_curved;
grade_received.textContent = "Grade Received: " + doc.data().grade_received;
professor.textContent = "Professor: " + doc.data().professor;

li.appendChild(class_taken);
li.appendChild(exam_curved);
li.appendChild(final_grade_curved);
li.appendChild(grade_received);
li.appendChild(professor);

submissionList.appendChild(li);
}


db.collection("Submission").get().then((snapshot) =>{
    snapshot.docs.forEach(doc => {
        renderSubmission(doc);
       console.log(doc.data());

    })
})