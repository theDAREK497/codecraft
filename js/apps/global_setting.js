const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
const m_btn_ar_st = document.getElementById('btn_ar_st');
const m_btn_ar_ex = document.getElementById('btn_ar_ex');
const m_btn_sn_st = document.getElementById('btn_sn_st');
const m_btn_sn_ex = document.getElementById('btn_sn_ex');
const RED_COLOR = "#FF0000";
const START_PLAYER_COLOR = "#0095DD";
const START_ENEMY_COLOR = "#DD9500";
const START_WALL_COLOR = "#717171";

m_btn_ar_st.disabled = false;
m_btn_ar_ex.disabled = true;
m_btn_sn_st.disabled = false;
m_btn_sn_ex.disabled = true;