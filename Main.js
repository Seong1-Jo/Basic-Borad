const ListMain = document.querySelector("#ListMain");
const WriteMain = document.querySelector("#WriteMain");
const ListMainBtn = document.querySelector("#ListMainBtn");
const SaveBtn = document.querySelector("#saveBtn");

const ListTitle = ListMain.querySelector("#ListTitle");
const BTitle = WriteMain.querySelector("#BTitle");
const BMain = WriteMain.querySelector("#BMain");

let listArray = []; //let으로 사용해야 업데이트가능
const REMOVE_HIDDEN = "hidden";
const LOCAL_NAME = "save";

function moveWirteMain() {
  WriteMain.classList.remove(REMOVE_HIDDEN);
  ListMain.classList.add(REMOVE_HIDDEN);
}

function saveListArray() {
  // localStorage.setItem(id, main);
  localStorage.setItem(LOCAL_NAME, JSON.stringify(listArray)); //JavaScript 값이나 객체를 JSON 문자열로 변환
  // console.log(localStorage.getItem(LOCAL_NAME));
}

function deleteList(event) {
  //버튼을 이용한 삭제 함수
  const delLi = event.target.parentElement;
  delLi.remove();
  listArray = listArray.filter((li) => li.id !== Number(delLi.id)); //true값만가능
  saveListArray();
}

function saveData(title) {
  //element생성,화면보여주기,
  const li = document.createElement("li");
  const h2 = document.createElement("h2");
  li.id = title.id;
  h2.innerText = title.title;
  const delBtn = document.createElement("button");
  delBtn.innerText = "삭제";
  delBtn.addEventListener("click", deleteList);
  li.appendChild(h2);
  li.appendChild(delBtn);
  ListTitle.appendChild(li);
}

function savedFuntion(event) {
  //저장함수
  event.preventDefault();

  const BTitleData = BTitle.value;
  const BMainData = BMain.value;
  const mainObj = {
    title: BTitleData,
    main: BMainData,
    id: Date.now(),
  };
  if (BTitleData === "" || BMainData === "") {
    alert("제목 또는 본문을 입력해주세요");
  } else {
    BTitle.value = "";
    BMain.value = "";

    listArray.push(mainObj);
    saveData(mainObj); //객체로 값넘겨주기
    saveListArray();

    WriteMain.classList.add(REMOVE_HIDDEN);
    ListMain.classList.remove(REMOVE_HIDDEN);
  }
}

ListMainBtn.addEventListener("click", moveWirteMain); //글쓰기이동 이벤트
SaveBtn.addEventListener("click", savedFuntion); //저장하기 이벤트

const getLocal = localStorage.getItem(LOCAL_NAME);

if (getLocal !== null) {
  const parseLocal = JSON.parse(getLocal); //JSON 문자열의 구문을 분석하고, 그 결과에서 JavaScript 값이나 객체를 생성
  listArray = parseLocal;
  parseLocal.forEach(saveData); // 주어진 함수를 배열 요소 각각에 대해 실행
}
