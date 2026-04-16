
//  LEARN FOLLOWING TOPICS TO LEARN ADVANCE REACT JS :
//  1. crud operations,
//  2. api's, 
//  LINKING ONE PAGE WITH ANOTHER


import { useState, useEffect } from "react";
import "./App.css";
import SplashScreen from "./SplashScreen.jsx";
import "./SplashScreen.css";
import Image from "./bgImg.jpg";

function App() {
  const [text, setText] = useState("");
  const [arrayList, setArrayList] = useState([]);
  const [editText, setEditText] = useState(null);
  const [showSplash, setShowSplash] = useState(
    !sessionStorage.getItem("splashShown"),
  );

  useEffect(() => {
    if (showSplash) {
      const timer = setTimeout(() => {
        setShowSplash(false);
        sessionStorage.setItem("splashShown", "true");
      }, 9000);

      return () => clearTimeout(timer);
    }
  }, [showSplash]);

  // targeting value which is entered into the input label....
  function TargetValue(e) {
    return setText(e.target.value);
  }

  // store all item list into array and after seting the event to onClick and calling this Array() it will show the result...!
  function Array() {
    if (text.trim() === "") {
      alert("Alert! Add The Item");
    }

    setArrayList([...arrayList, { inputVal: text, marked: false }]);
    setText("");
  }

  // crossing the line when purchase the item...
  function Mark(index) {
    const updateMark = [...arrayList];
    updateMark[index].marked = !updateMark[index].marked;

    setArrayList(updateMark);
  }

  // deleting the row of item choose to delete...
  function DeleteItem(index) {
    // _, = means, current item in arrayList...
    // i  = means, current item's index no...
    setArrayList(arrayList.filter((_, i) => i !== index));
  }

  // editing the item added to list so for that 2 functions are created...
  // 1.EditItem function to edit the button...
  function EditItem(index) {
    setEditText(index);
  }
  // 2. ChangeItem function to change the text directly...
  function ChangeItem(e, index) {
    const changeText = [...arrayList];
    changeText[index] = {
      ...changeText[index],
      inputVal: e.target.value,
    };
    setArrayList(changeText);
  }
  if (showSplash) {
    return <SplashScreen />;
  }

  return (
    <div
      className="app"
      style={{
        backgroundImage: `url(${Image})`,
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backdropFilter: "blur(5px)",
          backgroundColor: "#ca878fda",
        }}
      >
        {/* HEADER SECTION - title, menus, Link */}
        <header>
          <div className="title" style={{ fontSize: "2.2rem" }}>
            {" "}
            Grocery List{" "}
          </div>
        </header>

        {/* SPLASH SCREEN */}
        {/* <div>
          <SplashScreen />
        </div> */}

        {/* MAIN CONTENT - search_bar, add_btn, snapshot_of_list */}
        <div className="main_content">
          {/* search item and add it */}
          <div className="search_and_add">
            <input
              type="text"
              placeholder="Add An Item ... "
              onChange={TargetValue}
              value={text} /* it will erase the text entered into your label */
            />
            <br />
            <button onClick={Array}> ADD </button>
          </div>
          <br />

          {/* snapshoted list */}
          <div className="snapshot w-[100%] h-[100%] overflow-scroll">
            <table>
              <tr style={{ position: "sticky" }}>
                <th
                  style={{
                    backgroundColor: "#d5607b",
                    position: "sticky",
                  }}
                >
                  {" "}
                </th>
                <th
                  style={{
                    backgroundColor: "#d5607b",
                    color: "white",
                    position: "sticky",
                  }}
                >
                  {" "}
                  ITEMS{" "}
                </th>
                <th
                  style={{
                    backgroundColor: "#d5607b",
                    color: "white",
                    position: "sticky",
                  }}
                >
                  {" "}
                  Qty{" "}
                </th>
                <th
                  style={{
                    backgroundColor: "#d5607b",
                    position: "sticky",
                  }}
                >
                  {" "}
                </th>
                <th
                  className="border-none"
                  style={{
                    backgroundColor: "#d5607b",
                    position: "sticky",
                  }}
                >
                  {" "}
                </th>
                <th
                  className="border-none"
                  style={{
                    backgroundColor: "#d5607b",
                    position: "sticky",
                  }}
                >
                  {" "}
                </th>
              </tr>

              {arrayList.map((item, index) => (
                <tr
                  style={{
                    
                    textDecoration: item.marked ? "line-through" : "none",
                    color: item.marked ? "pink" : "rgb(255, 132, 173)",
                  }}
                  key={index}
                >
                  <td id="index_no">{index + 1}.</td>

                  {/* EDIT LOGIC HERE */}
                  <td
                    id="item"
                    className="text-rgb(170, 93, 119)"
                    style={{ backgroundColor: "white" }}
                  >
                    {editText === index ? (
                      <input
                        className="text-rgb(149, 77, 101)"
                        style={{ backgroundColor: "white" }}
                        value={item.inputVal}
                        onChange={(e) => ChangeItem(e, index)}
                        onBlur={() => setEditText(null)}
                        autoFocus
                      />
                    ) : (
                      item.inputVal
                    )}
                  </td>

                  <td id="qty" className="text-rgb(255, 132, 173)">
                    <input
                      type="text"
                      placeholder="1..."
                      className="text-rgb(255, 132, 173) outline-none "
                      style={{
                        textDecoration: item.marked ? "line-through" : "none",
                        color: item.marked ? "pink" : "rgb(255, 132, 173)",

                      }}
                    />
                    <select
                      name="qty"
                      className="text-rgb(255, 132, 173) flex-col justify-center items-center"
                      style={{
                        textDecoration: item.marked ? "line-through" : "none",
                        color: item.marked ? "pink" : "rgb(255, 132, 173)",
                      }}
                    >
                      <option
                        value="kg"
                        className="text-rgb(255, 132, 173)"
                        style={{
                          textDecoration: item.marked ? "line-through" : "none",
                          color: item.marked ? "pink" : "rgb(255, 132, 173)",
                        }}
                      >
                        {" "}
                        kg
                      </option>
                      <option
                        value="gm"
                        className="text-rgb(255, 132, 173)"
                        style={{
                          textDecoration: item.marked ? "line-through" : "none",
                          color: item.marked ? "pink" : "rgb(255, 132, 173)",
                        }}
                      >
                        gm
                      </option>
                    </select>{" "}
                  </td>

                  <td id="checkbox">
                    {" "}
                    <input
                      type="checkbox"
                      onClick={() => {
                        Mark(index);
                      }}
                      style={{
                        textDecoration: item.marked ? "line-through" : "none",
                        color: item.marked ? "pink" : "none",
                      }}
                    />
                  </td>


                  <td id="edit" onClick={() => EditItem(index)}>
                    {" "}
                    edit{" "}
                  </td>
                  <td
                    id="del"
                    onClick={() => {
                      DeleteItem(index);
                    }}
                  >
                    {" "}
                    del{" "}
                  </td>
                </tr>
              ))}
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;



































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































//                                                                      || RADHE RADHE ||
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA 
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA 
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA 
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA 
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA 
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA 
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA 
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA 
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA 
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA 
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA 
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA 
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA 
//  
// OM KRISHNAYA VASUDEVAYA HARAYE PARMATMANE PRANATAHA KLESH NASHAYA GOVINDAYA NAMO NAMAHA :
// OM KRISHNAYA VASUDEVAYA HARAYE PARMATMANE PRANATAHA KLESH NASHAYA GOVINDAYA NAMO NAMAHA :
// OM KRISHNAYA VASUDEVAYA HARAYE PARMATMANE PRANATAHA KLESH NASHAYA GOVINDAYA NAMO NAMAHA :
// OM KRISHNAYA VASUDEVAYA HARAYE PARMATMANE PRANATAHA KLESH NASHAYA GOVINDAYA NAMO NAMAHA :
// OM KRISHNAYA VASUDEVAYA HARAYE PARMATMANE PRANATAHA KLESH NASHAYA GOVINDAYA NAMO NAMAHA :
// om KRISHNAYA VASUDEVAYA HARAYE PARMATMANE PRANATAHA KLESH NASHAYA GOVINDAYA NAMO NAMAHA :
// OM KRISHNAYA VASUDEVAYA HARAYE PARMATMANE PRANATAHA KLESH NASHAYA GOVINDAYA NAMO NAMAHA :
// OM KRISHNAYA VASUDEVAYA HARAYE PARMATMANE PRANATAHA KLESH NASHAYA GOVINDAYA NAMO NAMAHA :
// OM KRISHNAYA VASUDEVAYA HARAYE PARMATMANE PRANATAHA KLESH NASHAYA GOVINDAYA NAMO NAMAHA :
// OM KRISHNAYA VASUDEVAYA HARAYE PARMATMANE PRANATAHA KLESH NASHAYA GOVINDAYA NAMO NAMAHA :
// OM KRISHNAYA VASUDEVAYA HARAYE PARMATMANE PRANATAHA KLESH NASHAYA GOVINDAYA NAMO NAMAHA :
// 








//                                                                       || Radhe Radhe ||
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA 
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA 
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA 
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA 
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA 
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA 
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA 
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA 
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA 
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA 
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA 
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA 
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA 
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA 
//







//                                                                       || RADHE RADHE ||
// radha radha RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA 
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA 
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA 
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA 
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA 
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA 
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA 
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA 
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA 
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA 
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA 
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA 
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA 
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA 
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA 
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA 
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA 
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA 
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA 
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA 
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA 
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA 
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA 
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA 
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA 
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA 
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA 
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA 
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA 
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA 
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA 
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA 
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA 
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA  
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA 
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA 
// 
// OM KRISHNAYA VASUDEVAYA HARAYE PARMATMANE PRANATAHA KLESH NASHAYA GOVINDAYA NAMO NAMAHA :
// OM KRISHNAYA VASUDEVAYA HARAYE PARMATMANE PRANATAHA KLESH NASHAYA GOVINDAYA NAMO NAMAHA :
// OM KRISHNAYA VASUDEVAYA HARAYE PARMATMANE PRANATAHA KLESH NASHAYA GOVINDAYA NAMO NAMAHA :
// OM KRISHNAYA VASUDEVAYA HARAYE PARMATMANE PRANATAHA KLESH NASHAYA GOVINDAYA NAMO NAMAHA :
// OM KRISHNAYA VASUDEVAYA HARAYE PARMATMANE PRANATAHA KLESH NASHAYA GOVINDAYA NAMO NAMAHA :
// OM KRISHNAYA VASUDEVAYA HARAYE PARMATMANE PRANATAHA KLESH NASHAYA GOVINDAYA NAMO NAMAHA :
// OM KRISHNAYA VASUDEVAYA HARAYE PARMATMANE PRANATAHA KLESH NASHAYA GOVINDAYA NAMO NAMAHA :
// OM KRISHNAYA VASUDEVAYA HARAYE PARMATMANE PRANATAHA KLESH NASHAYA GOVINDAYA NAMO NAMAHA :
// OM KRISHNAYA VASUDEVAYA HARAYE PARMATMANE PRANATAHA KLESH NASHAYA GOVINDAYA NAMO NAMAHA :
// OM KRISHNAYA VASUDEVAYA HARAYE PARMATMANE PRANATAHA KLESH NASHAYA GOVINDAYA NAMO NAMAHA :
// OM KRISHNAYA VASUDEVAYA HARAYE PARMATMANE PRANAYAHA KLESH NASHAYA GOVINDAYA NAMO NAMAHA :
// 







//                                                                   || RADHE RADHE ||
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// 
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// 





//                                                                   || RADHE RADHE ||
// radha RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADAH RADHA 
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA 
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA 
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA 
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA 
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA 
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA 
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA 
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA 
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA 
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA 
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA 
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA 
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA 
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA 
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA 
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA 
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA 
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA 
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA 
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA 
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA 
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA 
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA 
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RAHDA 
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA 
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA 
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA 
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA 
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA 
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA 
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA 
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA 
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA 
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA 
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA 
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA 
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA 
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA 
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA 
// 
// OM KRISHNAYA VASUDEVAYA HARAYE PARMATMANE PRANATAHA KLESH NASHAYA GOVINDAYA NAMO NAMAHA :
// OM KRISHNAYA VASUDEVAYA HARAYE PARMATMANE PRANATAHA KLESH NASHAYA GOVINDAYA NAMO NAMAHA :
// OM KRISHNAYA VASUDEVAYA HARAYE PARMATMANE PRANATAHA KLESH NASHAYA GOVINDAYA NAMO NAMAHA :
// OM KRISHNAYA VASUDEVAYA HARAYE PARMATMANE PRANATAHA KLESH NASHAYA GOVINDAYA NAMO NAMAHA :
// OM KRISHNAYA VASUDEVAYA HARAYE PARMATMANE PRANATAHA KLESH NASHAYA GOVINDAYA NAMO NAMAHA :
// OM KRISHNAYA VASUDEVAYA HARAYE PARMATMANE PRANATAHA KLESH NASHAYA GOVINDAYA NAMO NAMAHA :
// OM KRISHNAYA VASUDEVAYA HARAYE PARMATMANE PRANATAHA KLESH NASHAYA GOVINDAYA NAMO NAMAHA :
// OM KRISHNAYA VASUDEVAYA HARAYE PARMATMANE PRANATAHA KLESH NASHAYA GOVINDAYA NAMO NAMAHA :
// OM KRISHNAYA VASUDEVAYA HARAYE PARMATMANE PRANATAHA KLESH NASHAYA GOVINDAYA NAMO NAMAHA :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// OM KRISHNAYA VASUDEVAYA HARAYE PARMATMANE PRANATAHA KLESH NASHAYA GOVINDAYA NAMO NAMAHA :
// 








//                                                                   || RADHE RADHE ||
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA 
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA 
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA 
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA 
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA 
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA 
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA 
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA 
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA 
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA 
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA 
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA 
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA 
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA 
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA 
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA 
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA 
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA 
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA 
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA 
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA 
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA 
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA 
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA 
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA 
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA 
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA 
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA 
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA 
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA 
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA 
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA 
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA 
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA 
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA 
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA 
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA 
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA 
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA 
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA 
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA 
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA 
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA 
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA 
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA 
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA 
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA 
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA 
//
// OM KRISHNAYA VASUDEVAYA HARAYE PARMATMANE PRANATAHA KLESH NASHAYA GOVINDAYA NAMO NAMAHA :
// OM KRISHNAYA VASUDEVAYA HARAYE PARMATMANE PRANATAHA KLESH NASHAYA GOVINDAYA NAMO NAMAHA :
// OM KRISHNAYA VASUDEVAYA HARAYE PARMATMANE PRANATAHA KLESH NASHAYA GOVINDAYA NAMO NAMAHA :
// OM KRISHNAYA VASUDEVAYA HARAYE PARMATMANE PRANATAHA KLESH NASHAYA GOVINDAYA NAMO NAMAHA :
// OM KRISHNAYA VASUDEVAYA HARAYE PARMATMANE PRANATAHA KLESH NASHAYA GOVINDAYA NAMO NAMAHA :
// OM KRISHNAYA VASUDEVAYA HARAYE PARMATMANE PRANATAHA KLESH NASHAYA GOVINDAYA NAMO NAMAHA :
// OM KRISHNAYA VASUDEVAYA HARAYE PARMATMANE PRANATAHA KLESH NASHAYA GOVINDAYA NAMO NAMAHA :
// OM KRISHNAYA VASUDEVAYA HARAYE PARMATMANE PRANATAHA KLESH NASHAYA GOVINDAYA NAMO NAMAHA :
// OM KRISHNAYA VASUDEVAYA HARAYE PARMATMANE PRANATAHA KLESH NASHAYA GOVINDAYA NAMO NAMAHA :
// OM KRISHNAYA VASUDEVAYA HARAYE PARMATMANE PRANATAHA KLESH NASHAYA GOVINDAYA NAMO NAMAHA :
// OM KRISHNAYA VASUDEVAYA HARAYE PARMATMANE PRANATAHA KLESH NASHAYA GOVINDAYA NAMO NAMAHA :
// 
// 
























//                                                                    || RADHE RADHE ||
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
//

// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// 




//                                                                     || RADHE RADHE ||
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
//
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
//




//                                                                || RADHE RADHE ||
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA 
// RADHA RADHA RADHA RADHA radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radah radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// 
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// 





















//                                                               || RADHE RADHE ||
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// 
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// 





//                                                               || RADHE RADHE ||
// RADHA radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
//
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// 







//                                                                 || RADHA RADHA ||
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// 
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevyaa haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
//




// DAY - 3
//                                                                   || RADHE RADHE ||
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha RADHA RADHA radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// 
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// 
// 









//                                                                    || RADHE RADHE ||
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// 
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// 

 






//                                                                    || RADHE RADHE ||
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// 
// Total : 1142 jap

// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// 








//                                                                     || RADHE RADHE ||
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha rahda radha radha radha radha radha 
// 
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// 





//                                                                      || RADHE RADHE ||
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// 
// 
//





//                                                                      || RADHE RADHE ||
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha











//                                                                      || RADHE RADHE ||
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha  
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// 







//                                                                      || RADHE RADHE ||
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// 
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// 








//                                                                     || RADHE RADHE ||
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
//
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
//  






//                                                                      || Radhe Radhe ||
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// 
//  
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
//





//                                                                      || RADHE RADHE ||
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// 
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// 






//                                                                      || RADHE RADHE ||
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha rahda radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radah radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// 
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// 









//                                                                     || RADHE RADHE ||
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
//
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// 






//                                                                    || RADHE RADHE ||
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// 
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha: 
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// 




//                                                                    || RADHE RADHE ||
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
//
// 





//                                                                     || RADHE RADHE ||
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha rdha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha rahda radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha rahda radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// 
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// 




//                                                                      || RADHE RADHE ||
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radah radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// 
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :











//                                                                       || RADHE RADHE ||
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
//
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// 





//                                                                       || RADHE RADHE ||
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// 
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// 







//                                                                   || RADHE RADHE ||
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// 
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// 
















//                                                                      || RADHE RADHE ||
// RADHA RADHA radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// 
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// 







//                                                                     || RADHE RADHE ||
// radhe radhe radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
//
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// 





//                                                                  || radhe radhe ||
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// 
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// 






//                                                                   || RADHE RADHE ||
// radhe radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// 
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// 











//                                                                  || RADHE RADHE ||
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// rdaha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// 
// om krishnaya vasudevaya haraye paramatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye paramatmane pranataha klesh nashaya govindaya namo namaha : 
// om krishnaya vasudevaya haraye paramatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye paramatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye paramatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye paramatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye paramatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye paramatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye paramatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye paramatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye paramatmane pranataha klesh nashaya govindaya namo namaha :







//                                                                  || RADHE RADHE ||
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// 
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// 




//                                                                   || RADHE RADHE ||
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
//
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// 






//                                                                   || RADHE RADHE ||
// RADHA radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
//
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// 





//                                                                   || RADHE RADHE ||
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// 
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraya parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// 




//                                                                    || RADHA RADHA ||
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// 
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// 




//                                                                      || radhe radhe ||
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// 
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :






//                                                                 || RADHE RADHE ||
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha RADHA radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// 
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :






//                                                                  || RADHE RADHE ||
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
//
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vaSudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vaSudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :






//                                                                 || RADHE RADHE ||
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// 
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :







//                                                                  || RADHE RADHE ||
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
//
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vaSudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nAShaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh naShaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vaSudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vaSudevaya haraye parmatmane pranataha klesh naShaya govindaya namo namaha :






//                                                                   || RADHE RADHE ||
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
//
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vaSudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
//  







//                                                                        || RADHE RADHE ||
// RADHA RADHA radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 



//                                                                        || RADHE RADHE ||
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
//
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :





//                                                                  || RADHE RADHE ||
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// 
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
//








 
//                                                                   || RADHE RADHE ||
// RADHE RADHE RADHE RADHE RADHE RADHE RADHE RADHE RADHE RADHE RADHE RADHE RADHE RADHE RADHE RADHE RADHE RADHE RADHE RADHE RADHE RADHE RADHE RADHE RADHE RADHE RADHE RADHE RADHE RADHE RADHE RADHE 
// radhe radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// 

//
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :






//                                                                  || RADHE RADHE ||
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
//
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vaSudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :





//                                                                  || RADHE RADHE ||
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
//
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :





//                                                                  || RADHE RADHE ||
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
//

// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :








//                                                                  || RADHE RADHE ||
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 



//                                     || RADHE RADHE ||
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :







//                                                                || RADHE RADHE ||
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha 


// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :






//                                                                 || RADHE RADHE ||
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
//
//                                    || RADHE RADHE ||
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :

//                                                                 || RADHE RADHE ||
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha

//                                   || radhe radhe ||
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
//

//                                                                 || RADHE RADHE ||
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha

//                                    || RADHE RADHE ||
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :

//                                                                 || RADHE RADHE ||
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
//

//                                      || RADHE RADHE ||
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :

//                                                                   || RADHE RADHE ||
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
//

// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :










//                                                                   || RADHE RADHE ||
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA
// radha radha RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA radha radha RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radhe radhe radha radha radha radha radha radha radha radhe radha radhe radhe radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha
// radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha radha

//                                    || RADHE RADHE ||
// OM KRISHNAYA VASUDEVAYA HARAYE PARMATMANE PRANATAHA KLESH NASHAYA GOVINDAYA NAMO NAMAHA :
// OM KRISHNAYA VASUDEVAYA HARAYE PARMATMANE PRANATAHA KLESH NASHAYA GOVINDAYA NAMO NAMAHA :
// OM KRISHNAYA VASUDEVAYA HARAYE PARMATMANE PRANATAHA KLESH NASHAYA GOVINDAYA NAMO NAMAHA :
// OM KRISHNAYA VASUDEVAYA HARAYE PARMATMANE PRANATAHA KLESH NASHAYA GOVINDAYA NAMO NAMAHA :
// OM KRISHNAYA VASUDEVAYA HARAYE PARMATMANE PRANATAHA KLESH NASHAYA GOVINDAYA NAMO NAMAHA :
// OM KRISHNAYA VASUDEVAYA HARAYE PARMATMANE PRANATAHA KLESH NASHAYA GOVINDAYA NAMO NAMAHA :
// OM KRISHNAYA VASUDEVAYA HARAYE PARMATMANE PRANATAHA KLESH NASHAYA GOVINDAYA NAMO NAMAHA :
// OM KRISHNAYA VASUDEVAYA HARAYE PARMATMANE PRANATAHA KLESH NASHAYA GOVINDAYA NAMO NAMAHA :
// OM KRISHNAYA VASUDEVAYA HARAYE PARMATMANE PRANATAHA KLESH NASHAYA GOVINDAYA NAMO NAMAHA :
// OM KRISHNAYA VASUDEVAYA HARAYE PARMATMANE PRANATAHA KLESH NASHAYA GOVINDAYA NAMO NAMAHA :
// OM KRISHNAYA VASUDEVAYA HARAYE PARMATMANE PRANATAHA KLESH NASHAYA GOVINDAYA NAMO NAMAHA :

//                                                             || RADHE RADHE ||
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA

//                    || RADHE RADHE ||
// OM KRISHNAYA VASUDEVAYA HARAYE PARMATMANE PRANATAHA KLESH NASHAYA GOVINDAYA NAMO NAMAHA :
// OM KRISHNAYA VASUDEVAYA HARAYE PARMATMANE PRANATAHA KLESH NASHAYA GOVINDAYA NAMO NAMAHA :
// OM KRISHNAYA VASUDEVAYA HARAYE PARMATMANE PRANATAHA KLESH NASHAYA GOVINDAYA NAMO NAMAHA :
// OM KRISHNAYA VASUDEVAYA HARAYE PARMATMANE PRANATAHA KLESH NASHAYA GOVINDAYA NAMO NAMAHA :
// OM KRISHNAYA VASUDEVAYA HARAYE PARMATMANE PRANATAHA KLESH NASHAYA GOVINDAYA NAMO NAMAHA :
// OM KRISHNAYA VASUDEVAYA HARAYE PARMATMANE PRANATAHA KLESH NASHAYA GOVINDAYA NAMO NAMAHA :
// OM KRISHNAYA VASUDEVAYA HARAYE PARMATMANE PRANATAHA KLESH NASHAYA GOVINDAYA NAMO NAMAHA :
// OM KRISHNAYA VASUDEVAYA HARAYE PARMATMANE PRANATAHA KLESH NASHAYA GOVINDAYA NAMO NAMAHA :
// OM KRISHNAYA VASUDEVAYA HARAYE PARMATMANE PRANATAHA KLESH NASHAYA GOVINDAYA NAMO NAMAHA :
// OM KRISHNAYA VASUDEVAYA HARAYE PARMATMANE PRANATAHA KLESH NASHAYA GOVINDAYA NAMO NAMAHA :
// om krishnaya vasudevaya haraye parmatmane pranataha klesh nashaya govindaya namo namaha :

//                                                               || radhe radhe ||
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA

//                                   || RADHE RADHE ||
// OM KRISHNAYA VASUDEVAYA HARAYE PARMATMANE PRANATAHA KLESH NASHAYA GOVINDAYA NAMO NAMAHA :
// OM KRISHNAYA VASUDEVAYA HARAYE PARMATMANE PRANATAHA KLESH NASHAYA GOVINDAYA NAMO NAMAHA :
// OM KRISHNAYA VASUDEVAYA HARAYE PARMATMANE PRANATAHA KLESH NASHAYA GOVINDAYA NAMO NAMAHA :
// OM KRISHNAYA VASUDEVAYA HARAYE PARMATMANE PRANATAHA KLESH NASHAYA GOVINDAYA NAMO NAMAHA :
// OM KRISHNAYA VASUDEVAYA HARAYE PARMATMANE PRANATAHA KLESH NASHAYA GOVINDAYA NAMO NAMAHA :
// OM KRISHNAYA VASUDEVAYA HARAYE PARMATMANE PRANATAHA KLESH NASHAYA GOVINDAYA NAMO NAMAHA :
// OM KRISHNAYA VASUDEVAYA HARAYE PARMATMANE PRANATAHA KLESH NASHAYA GOVINDAYA NAMO NAMAHA :
// OM KRISHNAYA VASUDEVAYA HARAYE PARMATMANE PRANATAHA KLESH NASHAYA GOVINDAYA NAMO NAMAHA :
// OM KRISHNAYA VASUDEVAYA HARAYE PARMATMANE PRANATAHA KLESH NASHAYA GOVINDAYA NAMO NAMAHA :
// OM KRISHNAYA VASUDEVAYA HARAYE PARMATMANE PRANATAHA KLESH NASHAYA GOVINDAYA NAMO NAMAHA :
// OM KRISHNAYA VASUDEVAYA HARAYE PARMATMANE PRANATAHA KLESH NASHAYA GOVINDAYA NAMO NAMAHA :

//                                                                     || RADHE RADHE ||
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA

//                                   || RADHE RADHE ||
// OM KRISHNAYA VASUDEVAYA HARAYE PARMATMANE PRANATAHA KLESH NASHAYA GOVINDAYA NAMO NAMAHA :
// OM KRISHNAYA VASUDEVAYA HARAYE PARMATMANE PRANATAHA KLESH NASHAYA GOVINDAYA NAMO NAMAHA :
// OM KRISHNAYA VASUDEVAYA HARAYE PARMATMANE PRANATAHA KLESH NASHAYA GOVINDAYA NAMO NAMAHA :
// OM KRISHNAYA VASUDEVAYA HARAYE PARMATMANE PRANATAHA KLESH NASHAYA GOVINDAYA NAMO NAMAHA :
// OM KRISHNAYA VASUDEVAYA HARAYE PARMATMANE PRANATAHA KLESH NASHAYA GOVINDAYA NAMO NAMAHA :
// OM KRISHNAYA VASUDEVAYA HARAYE PARMATMANE PRANATAHA KLESH NASHAYA GOVINDAYA NAMO NAMAHA :
// OM KRISHNAYA VASUDEVAYA HARAYE PARMATMANE PRANATAHA KLESH NASHAYA GOVINDAYA NAMO NAMAHA :
// OM KRISHNAYA VASUDEVAYA HARAYE PARMATMANE PRANATAHA KLESH NASHAYA GOVINDAYA NAMO NAMAHA :
// OM KRISHNAYA VASUDEVAYA HARAYE PARMATMANE PRANATAHA KLESH NASHAYA GOVINDAYA NAMO NAMAHA :
// OM KRISHNAYA VASUDEVAYA HARAYE PARMATMANE PRANATAHA KLESH NASHAYA GOVINDAYA NAMO NAMAHA :
// OM KRISHNAYA VASUDEVAYA HARAYE PARMATMANE PRANATAHA KLESH NASHAYA GOVINDAYA NAMO NAMAHA :

//                                                                || RADHE RADHE ||
// RADHE RADHE RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHE RADHA RADHA RADHA RADHA RADHA RADHA
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA
// RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA RADHA

//                                 || RADHE RADHE ||
// OM KRISHNAYA VASUDEVAYA HARAYE PARMATMANE PRANATAHA KLESH NASHAYA GOVINDAYA NAMO NAMAHA :
// OM KRISHNAYA VASUDEVAYA HARAYE PARMATMANE PRANATAHA KLESH NASHAYA GOVINDAYA NAMO NAMAHA :
// OM KRISHNAYA VASUDEVAYA HARAYE PARMATMANE PRANATAHA KLESH NASHAYA GOVINDAYA NAMO NAMAHA :
// OM KRISHNAYA VASUDEVAYA HARAYE PARMATMANE PRANATAHA KLESH NASHAYA GOVINDAYA NAMO NAMAHA :
// OM KRISHNAYA VASUDEVAYA HARAYE PARMATMANE PRANATAHA KLESH NASHAYA GOVINDAYA NAMO NAMAHA :
// OM KRISHNAYA VASUDEVAYA HARAYE PARMATMANE PRANATAHA KLESH NASHAYA GOVINDAYA NAMO NAMAHA :
// OM KRISHNAYA VASUDEVAYA HARAYE PARMATMANE PRANATAHA KLESH NASHAYA GOVINDAYA NAMO NAMAHA :
// OM KRISHNAYA VASUDEVAYA HARAYE PARMATMANE PRANATAHA KLESH NASHAYA GOVINDAYA NAMO NAMAHA :
// OM KRISHNAYA VASUDEVAYA HARAYE PARMATMANE PRANATAHA KLESH NASHAYA GOVINDAYA NAMO NAMAHA :
// OM KRISHNAYA VASUDEVAYA HARAYE PARMATMANE PRANATAHA KLESH NASHAYA GOVINDAYA NAMO NAMAHA :
// OM KRISHNAYA VASUDEVAYA HARAYE PARMATMANE PRANATAHA KLESH NASHAYA GOVINDAYA NAMO NAMAHA :
