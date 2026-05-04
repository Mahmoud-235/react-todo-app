import "./todo.css";
import * as React from "react";
import { TodoContext } from "./context/TodoContext";
import { useContext, useEffect, useMemo } from "react";
import ButtonGroup from "@mui/material/ButtonGroup";
import { SnackbarContext } from "./context/SnackbarContext";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
} from "@mui/material";

export default function Todo() {
  const { showSnscker } = useContext(SnackbarContext);
  const STORAGE_KEY = "todos";
  const { items, setItems } = useContext(TodoContext);

  // 🗑️ Delete Dialog
  const [deleteOpen, setDeleteOpen] = React.useState(false);
  const [deleteId, setDeleteId] = React.useState(null);

  const [disblayTodosType, setDisblayTodosType] = React.useState("all");

  // ✏️ Edit Dialog
  const [editOpen, setEditOpen] = React.useState(false);
  const [currentItem, setCurrentItem] = React.useState(null);

  const [title, setTitle] = React.useState("");
  const [details, setDetails] = React.useState("");

  // 📥 قراءة مرة واحدة
  // 📥 القراءة والتحميل عند أول رندر فقط
  useEffect(() => {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
      try {
        const parsedData = JSON.parse(data);
        // نتأكد أن البيانات ليست فارغة قبل التحديث
        if (parsedData && parsedData.length > 0) {
          setItems(parsedData);
        }
      } catch (e) {
        console.error("Error parsing localStorage data", e);
      }
    }
  }, []); // تشغيل مرة واحدة فقط عند البداية

  // 💾 الحفظ التلقائي: يتم فقط عندما تتغير items وتكون تحتوي على بيانات أو تم تعديلها فعلياً
  useEffect(() => {
    // هذا الشرط يمنع مسح التخزين إذا كانت المصفوفة فارغة تماماً عند التحميل الأول
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  // ✅ Done toggle
  const handleClickCheck = (id) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isdone: !item.isdone } : item,
      ),
    );
    showSnscker("تم التعديل نجاح ");
  };

  // 🗑️ فتح حذف
  const handleDeleteOpen = (id) => {
    setDeleteId(id);
    setDeleteOpen(true);
  };

  function changeDisblayed(e) {
    setDisblayTodosType(e.target.value);
  }

  const handleConfirmDelete = () => {
    setItems(items.filter((item) => item.id !== deleteId));
    setDeleteOpen(false);
    showSnscker("تم الحذف جاح ");
  };

  // ✏️ فتح تعديل
  const handleEditOpen = (item) => {
    setCurrentItem(item);
    setTitle(item.name);
    setDetails(item.details || "");
    setEditOpen(true);
  };

  // 💾 حفظ التعديل
  const handleSaveEdit = () => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === currentItem.id
          ? { ...item, name: title, details: details }
          : item,
      ),
    );
    setEditOpen(false);
    showSnscker("تم التحديث نجاح");
  };
  const completetd = useMemo(() => {
    return items.filter((i) => {
      return i.isdone;
    });
  }, [items]);

  const nonCompletetd = useMemo(() => {
    return items.filter((i) => {
      return !i.isdone;
    });
  }, [items]);

  let todoToRerender = items;
  if (disblayTodosType == "completed") {
    todoToRerender = completetd;
  } else if (disblayTodosType == "non-completed") {
    todoToRerender = nonCompletetd;
  } else {
    todoToRerender = items;
  }

  return (
    <>
      <div id="nav">
        <h1 style={{ textAlign: "center", fontSize: "80px" }}>مهامي</h1>
        <hr />

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            "& > *": {
              m: 1,
            },
          }}
        >
          <ButtonGroup
            variant="outlined"
            aria-label="Basic button group"
            value={disblayTodosType}
            onClick={changeDisblayed}
          >
            <Button value="all">الكل</Button>
            <Button value="completed">منجز</Button>
            <Button value="non-completed">غير منجز</Button>
          </ButtonGroup>
        </Box>
      </div>
      {todoToRerender.map((list) => (
        <div id="todo" key={list.id}>
          <h1>{list.name}</h1>

          <div id="icon" style={{ direction: "ltr" }}>
            {/* 🗑️ Delete */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 0 24 24"
              width="24px"
              fill="#d50d0dff"
              className="details-icon"
              onClick={() => handleDeleteOpen(list.id)}
            >
              <path d="M0 0h24v24H0V0z" fill="none" />
              <path d="M16 9v10H8V9h8m-1.5-6h-5l-1 1H5v2h14V4h-3.5l-1-1zM18 7H6v12c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7z" />
            </svg>

            {/* ✏️ Edit */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 0 24 24"
              width="24px"
              fill="#1d4fd8ff"
              className="details-icon"
              onClick={() => handleEditOpen(list)}
            >
              <path d="M0 0h24v24H0V0z" fill="none" />
              <path d="M14.06 9.02l.92.92L5.92 19H5v-.92l9.06-9.06M17.66 3c-.25 0-.51.1-.7.29l-1.83 1.83 3.75 3.75 1.83-1.83c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.2-.2-.45-.29-.71-.29zm-3.6 3.19L3 17.25V21h3.75L17.81 9.94l-3.75-3.75z" />
            </svg>

            {/* ✅ Done */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 0 24 24"
              width="24px"
              fill="rgb(71, 77, 71)"
              className={list.isdone ? "details-icon-true" : "details-icon"}
              onClick={() => handleClickCheck(list.id)}
            >
              <path d="M0 0h24v24H0V0z" fill="none" />
              <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" />
            </svg>
          </div>
        </div>
      ))}

      {/* 🗑️ Delete Dialog */}
      <Dialog open={deleteOpen} onClose={() => setDeleteOpen(false)}>
        <DialogTitle>تأكيد الحذف</DialogTitle>
        <DialogContent>هل أنت متأكد من حذف هذه المهمة؟</DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteOpen(false)}>إلغاء</Button>
          <Button onClick={handleConfirmDelete} color="error">
            حذف
          </Button>
        </DialogActions>
      </Dialog>

      {/* ✏️ Edit Dialog */}
      <Dialog open={editOpen} onClose={() => setEditOpen(false)} dir="rtl">
        <DialogTitle>تعديل المهمة</DialogTitle>

        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <TextField
              label="العنوان"
              variant="standard"
              fullWidth
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              sx={{ mb: 3 }}
            />

            <TextField
              label="التفاصيل"
              variant="standard"
              fullWidth
              value={details}
              onChange={(e) => setDetails(e.target.value)}
            />
          </Box>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setEditOpen(false)}>إلغاء</Button>
          <Button onClick={handleSaveEdit}>تعديل</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
