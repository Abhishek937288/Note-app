import { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
   const [isForm, setIsForm] = useState(false);
   const[formMode,setFormMode]=useState("add");
   const[refresh,setRefresh]=useState(true);
    const [formData, setFormData] = useState({ title: "", description: "" });
    const[id,setId]=useState("");

  return (
    <UserContext.Provider value={{ isForm,setIsForm,setRefresh,refresh, formMode,setFormMode,formData,setFormData,setId,id}}>
      {children}
    </UserContext.Provider>
  );
};
