export default function studentBranchFun(testString) {
  let pattern = /^A[A0-9]$/g;

  let codeToBranch = {
    A4: "Mechanical",
    A7: "Computer Science",
    A2: "Civil Engineering",
    A1: "Chemical Engineering",
    A3: "Electrical and Electronics",
    A8: "Electronics and Instrumentation",
    AA: "Electronics and Communication",
  };

  console.log(codeToBranch[testString.match(pattern)[0]] , " inside of studentBranchFun !!! \n");

  return codeToBranch[testString.match(pattern)[0]] ;
}





