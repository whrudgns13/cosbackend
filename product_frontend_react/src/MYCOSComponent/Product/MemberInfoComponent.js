import React, { useEffect, useState } from 'react';
import {Grid, Button, makeStyles, Modal, Backdrop, Fade} from '@material-ui/core';
import {InputLabel, MenuItem, Select, FormControl} from '@material-ui/core';
import ApiService from '../../ApiService';



function MemberInfoComponent(props) {

    const [change_email, setchange_email] = useState(null);
    const [change_phone, setchange_phone] = useState(null);
    const [change_password, setchange_password] = useState(null);
    const [user_email, setuser_email] = useState(props.user.user_email);

    useEffect(() => {
    // setchange_email('suovj140@gmail.com');
    // setchange_phone('010-4474-9986');
    // setchange_password('rnwlgns2');
    console.log("change_email : " + change_email);
    console.log("change_phone : " + change_phone);
    console.log("change_password : " + change_password);
    console.log("gender : " + props.user.user_gender);
    },[change_email, change_phone, change_password]);

    const Change_user = {
        user_email : user_email,
        change_email : change_email,
        change_phone : change_phone,
        change_password : change_password,
    }

    // 업데이트 로직
    function updateButton(){
        console.log(Change_user);
        ApiService.updateUserInfo(Change_user);
        alert('업데이트 성공');
    };

    function onChange(e){
        if(e.target.name == "change_email"){
            setchange_phone(null);
            setchange_password(null);
            setchange_email(e.target.value);
        }else if(e.target.name == "change_phone"){
            setchange_email(null);
            setchange_password(null);
            setchange_phone(e.target.value);
        }else if(e.target.name == "change_password"){
            setchange_email(null);
            setchange_phone(null);
            setchange_password(e.target.value);
        }
    }




    // 모달
    const useStyles = makeStyles((theme) => ({
        modal: {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        },
        paper: {
          backgroundColor: theme.palette.background.paper,
          boxShadow: theme.shadows[5],
          padding: theme.spacing(2, 4, 3),
          borderRadius:'10px'
        },
      }));


    const classes = useStyles();

    const [open, setOpen] = React.useState(false);
    const [openChangePhone, setOpenChangePhone] = React.useState(false);
    const [openChangePassword, setOpenChangePassword] = React.useState(false);
    const [openUserDelete, setOpenUserDelete] = React.useState(false);
    const [openReCheckUserDelete, setOpenReCheckUserDelete] = React.useState(false);

    const handleOpen = (e) => {
        if(e.target.name === "change_email"){
            setOpen(true);
        }if(e.target.name === "change_phone"){
            setOpenChangePhone(true);
        }if(e.target.name === "change_password"){
            setOpenChangePassword(true);
        }if(e.target.name === "user_delete"){
            setOpenUserDelete(true);
        }if(e.target.name === "recheck_user_delete"){
            setOpenReCheckUserDelete(true);
        }
    };
    
    const handleClose = (e) => {
        setOpen(false);
        setOpenChangePhone(false);
        setOpenChangePassword(false);
        setOpenUserDelete(false);
        setOpenReCheckUserDelete(false);
    };


    // 엔터버튼 눌렀을 때 함수 실행
    const onKeyPress = (e) => {
        if(e.key === 'Enter'){
            updateButton();
            handleClose();
        }
    }

    const checkGender = (e) => {
        if(props.user.user_gender === e.target.value){
            console.log('aaaa');
            return e.target.checked;
        }
    }

    // 유저 탈퇴 처리 함수
    function deleteUser(){
        alert('회원탈퇴 처리가 완료됐습니다.');
        ApiService.deleteUserInfo(Change_user);
        handleClose();
        window.location.reload(); // 로그인 페이지로 이동시켜야할듯
    }







    return (
        <>
           <Grid item xs={6} sm={7}>
                    <div style={{fontSize:'13px', textAlign:'left'}}>회원정보변경</div>
                    <hr style={{height:'1px', backgroundColor:'lightgray', border:'0px', opacity:'70%', margin:'20px 0px 20px 0px', paddingBottom:'0px'}}/>

                    <div style={centerDiv}>
                        <div style={centerDivBetween}>
                            <div style={centerLabel}>이메일 주소</div>
                            <div><button name="change_email" onClick={handleOpen} style={{border:'0px', fontSize:'12px', borderRadius:'0px', color:'gray'}}>변경하기</button></div>
                        </div>
                        <div style={{textAlign:'left'}}><input disabled style={centerInput} value={props.user.user_email}></input></div>
                    </div>

                    <div style={centerDiv}>
                        <div style={centerLabel}>이름</div>
                        <div style={{textAlign:'left'}}><input disabled style={centerInput} value={props.user.user_name}></input></div>
                    </div>

                    <div style={centerDiv}>
                        <div style={centerLabel}>생년월일</div>
                        <div style={{textAlign:'left'}}><input disabled style={centerInput} value={props.user.user_birthday}></input></div>
                    </div>

                    <div style={centerDiv}>
                        <div style={centerDivBetween}>
                            <div style={centerLabel}>휴대폰번호</div>
                            <div><button name="change_phone" onClick={handleOpen} style={{border:'0px', fontSize:'12px', borderRadius:'0px', color:'gray'}}>변경하기</button></div>
                        </div>
                        <div style={{textAlign:'left'}}><input disabled style={centerInput} value={props.user.user_phone}></input></div>
                    </div>

                    <div style={centerDiv}>
                        <div style={centerDivBetween}>
                            <div style={centerLabel}>비밀번호</div>
                            <div><button name="change_password" onClick={handleOpen} style={{border:'0px', fontSize:'12px', borderRadius:'0px', color:'gray'}}>변경하기</button></div>
                        </div>
                    </div>

                    <div style={{fontSize:'13px', textAlign:'left', marginTop:'50px'}}>부가정보(선택)</div>
                    <hr style={{height:'1px', backgroundColor:'lightgray', border:'0px', opacity:'70%', margin:'20px 0px 20px 0px', paddingBottom:'0px'}}/>

                    <div style={centerDiv}>
                        <div style={centerLabel}>성별</div>
                        <div style={{fontSize:'14px', marginTop:'10px', justifyContent:'left', display:'flex'}}>
                            <input type='radio' name='gender' value='M' onChange={checkGender} disabled/> 남 
                            <input type='radio' name='gender' value='W' onChange={checkGender} disabled/> 여
                        </div>
                    </div>

                    {/* <div style={centerDiv}>
                        <div style={centerLabel}>관심매장선택</div>
                        <div style={{textAlign:'left'}}>
                            <FormControl style={{minWidth:'120px', marginRight:'10px'}}>
                                <InputLabel style={{fontSize:'14px'}}>관심매장선택</InputLabel>
                                <Select name='Favorite_Market'>
                                    <MenuItem><div style={{fontSize:'14px'}}>서울 송파점</div></MenuItem>
                                    <MenuItem><div style={{fontSize:'14px'}}>서울 영등포점</div></MenuItem>
                                    <MenuItem><div style={{fontSize:'14px'}}>서울 마포점</div></MenuItem>
                                    <MenuItem><div style={{fontSize:'14px'}}>서울 서초점</div></MenuItem>
                                    <MenuItem><div style={{fontSize:'14px'}}>서울 롯데점</div></MenuItem>
                                    <MenuItem><div style={{fontSize:'14px'}}>인천 계양점</div></MenuItem>
                                    <MenuItem><div style={{fontSize:'14px'}}>모르는데요?</div></MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                    </div>

                    <div style={centerDiv}>
                        <div style={centerLabel}>제3자(H&M) 정보제공동의</div>
                        <div style={{fontSize:'14px', marginTop:'10px', justifyContent:'left', display:'flex'}}>
                        <input type='radio' value='M'/> 동의합니다 <input type='radio' value='W'/> 동의하지 않습니다
                        </div>
                    </div>

                    <div style={{marginTop:'25px', marginBottom:'100px'}}>
                        <Button style={{display:'flex', color:'#FFFFFF', backgroundColor:'#444444', border:'0px', fontSize:'13px', width:'100%', padding:'7px 0px 7px 0px', maxWidth:'270px'}} onClick={() => oncc()}>확인</Button>
                    </div> */}


                    <div style={spaceBetween}><span>환불계좌/현금영수증</span> <span><button name="user_delete" onClick={handleOpen} style={{border:'0px', fontSize:'12px', borderRadius:'0px', color:'gray'}}>더보기</button></span></div>
                    <hr style={bottomHr}/>

                    <div style={spaceBetween}><span>개인계정 연결관리</span> <span><button name="user_delete" onClick={handleOpen} style={{border:'0px', fontSize:'12px', borderRadius:'0px', color:'gray'}}>더보기</button></span></div>
                    <hr style={bottomHr}/>

                    <div style={spaceBetween}><span>회원탈퇴</span> <span><button name="user_delete" onClick={handleOpen} style={{border:'0px', fontSize:'12px', borderRadius:'0px', color:'gray'}}>신청</button></span></div>
                    <hr style={bottomHr}/>

                    <div style={{marginBottom:'80px'}}></div>
                    

                </Grid>

                {/* 모달 모아두기 - 나중에 줄일 예정 */}
                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    className={classes.modal}
                    open={open}
                    onClose={handleClose}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500,
                    }}
                >
                    <Fade in={open}>
                        <div className={classes.paper}>
                            <h5>변경할 이메일 주소</h5>
                            <p><input style={{padding:'10px', borderRadius:'0px', border:'1px solid gray'}} type="text" name="change_email" onChange={onChange} onKeyPress={onKeyPress}></input></p>
                        </div>
                        </Fade>
                </Modal>

                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    className={classes.modal}
                    open={openChangePhone}
                    onClose={handleClose}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500,
                    }}
                >
                    <Fade in={openChangePhone}>
                        <div className={classes.paper}>
                            <h5>변경할 휴대폰 번호</h5>
                            <p><input style={{padding:'10px', borderRadius:'0px', border:'1px solid gray'}} type="text" name="change_phone" onChange={onChange} onKeyPress={onKeyPress}></input></p>
                        </div>
                        </Fade>
                </Modal>

                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    className={classes.modal}
                    open={openChangePassword}
                    onClose={handleClose}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500,
                    }}
                >
                    <Fade in={openChangePassword}>
                        <div className={classes.paper}>
                            <h5>변경할 비밀번호</h5>
                            <p><input style={{padding:'10px', borderRadius:'0px', border:'1px solid gray'}} type="text" name="change_password" onChange={onChange} onKeyPress={onKeyPress}></input></p>
                        </div>
                        </Fade>
                </Modal>

                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    className={classes.modal}
                    open={openUserDelete}
                    onClose={handleClose}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500,
                    }}
                >
                    <Fade in={openUserDelete}>
                        <div className={classes.paper}>
                            <h5>회원 탈퇴</h5>
                            <div style={{fontSize:'12px', textAlign:'left'}}>
                            이용해 주셔서 감사합니다.<br/>
                            이용하시면서 불만족스러웠던 점을 지적해주시면 서비스 개선에 참고하도록 하겠습니다.<br/>
                            회원 탈퇴 시, 아래 사항을 유의해 주시기 바랍니다.<br/>
                            </div>

                            <hr style={{height:'1px', backgroundColor:'lightgray', border:'0px', opacity:'70%', margin:'50px 0px 50px 0px', paddingBottom:'0px'}}/>
                            <h5>회원탈퇴 확인사항</h5>
                            <div style={{fontSize:'12px', textAlign:'left'}}>
                            ※ 재가입하셔도 개인정보가 복원되지 않습니다.<br/>
                            더현대닷컴에 가지고 계신 더머니, 예치금, 할인쿠폰 등의 혜택이 자동 삭제되며, 재가입하실 경우에도 복원되지 않습니다.<br/>
                            <br/>
                            ※ 아이디를 재사용하실 수 없습니다.<br/>
                            기존에 사용하셨던 ID는 재가입 시 사용하실 수 없습니다.<br/>
                            <br/>
                            ※ 탈퇴 후에도 게시판형 서비스에 등록한 게시물은 그대로 남아 있습니다.<br/>
                            게시판 등에 올린 게시글 및 댓글은 탈퇴시 자동삭제되지 않고 남아 있습니다. 삭제를 원하시는 게시글이 있다면 탈퇴전에 삭제하시기 바랍니다.<br/>
                            (단, 답글이 달린 글은 삭제 불가)
                            <hr style={{height:'1px', backgroundColor:'lightgray', border:'0px', opacity:'70%', margin:'50px 0px 50px 0px', paddingBottom:'0px'}}/>

                            ※ 진행중인 주문, 반품이 있을 시 회원 탈퇴가 불가능 합니다. 해당 사항을 완료 후 탈퇴를 하실 수 있습니다.<br/>
                            </div>
                            <div style={{marginTop:'50px', marginBottom:'50px'}}></div>
                                <Button variant="contained" style={{backgroundColor:'white', width:'200px', height:'40px', borderRadius:'0px', marginBottom:'10px', boxShadow:'none', fontSize:'13px', border:'1px solid lightgray', marginRight:'10px'}} onClick={handleClose}>취소</Button>
                                <Button variant="contained" style={{backgroundColor:'#444', width:'200px', height:'40px', borderRadius:'0px', marginBottom:'10px', boxShadow:'none', fontSize:'13px', color:'white'}} name='recheck_user_delete' onClick={handleOpen}><span name='recheck_user_delete' onClick={handleOpen}>회원 탈퇴</span></Button><br/>
                            </div>
                        </Fade>
                </Modal>

                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    className={classes.modal}
                    open={openReCheckUserDelete}
                    onClose={handleClose}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500,
                    }}
                >
                    <Fade in={openReCheckUserDelete}>
                        <div className={classes.paper}>
                            <h5>정말 회원 탈퇴 하시겠습니까?</h5>
                                <Button variant="contained" style={{backgroundColor:'white', width:'200px', height:'40px', borderRadius:'0px', marginBottom:'10px', boxShadow:'none', fontSize:'13px', border:'1px solid lightgray', marginRight:'10px'}} onClick={handleClose}>취소</Button>
                                <Button variant="contained" style={{backgroundColor:'#444', width:'200px', height:'40px', borderRadius:'0px', marginBottom:'10px', boxShadow:'none', fontSize:'13px', color:'white'}} name='recheck_user_delete' onClick={deleteUser}>회원 탈퇴</Button><br/>
                        </div>
                        </Fade>
                </Modal>
        </>
    )    
}

const centerDivBetween = {
    display:'flex', justifyContent:'space-between'
}

const centerDiv = {
    marginTop:'25px'
}

const centerLabel = {
    fontSize:'13px', textAlign:'left', color:'#999999'
}

const centerInput = {
    border:'0px', backgroundColor:'white', textAlign:'left', fontSize:'12px'
}

const centerInfo = {
    fontSize:'11px', textAlign:'left', color:'#999999', maxWidth:'270px'
}

const spaceBetween = {
    fontSize:'13px', marginTop:'40px', display:'flex', justifyContent:'space-between'
}

const bottomHr = {
    height:'1px', backgroundColor:'lightgray', border:'0px', opacity:'70%', margin:'8px 0px 30px 0px', paddingBottom:'0px'
}

export default MemberInfoComponent