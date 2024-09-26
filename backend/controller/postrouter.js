import express from 'express'
import { createpost,
         getpost,
         deletepost,
         managelike ,
         createreply,
         updatereply,
        feedposts,
        getreply,
        deletereply,
        getadminposts,
        getlikedposts,
        getcommentedposts,
        getcurretnadminposts} from '../routes/postroutes.js';
// import authuser from '../middlewares/authuser.js';
import Authuser from '../middlewares/authuser.js';


const router=express.Router();  

router.post('/create' ,createpost)
router.get('/feed',Authuser,feedposts)
router.get('/likes',Authuser,getlikedposts)
router.get('/comments',Authuser,getcommentedposts)
router.get('/:id',getpost)
router.get('/user/:id',getadminposts)
router.get('/currentuser/:id',Authuser,getcurretnadminposts)
router.delete('/:id',Authuser,deletepost)
router.put('/likes/:id',Authuser,managelike)
router.post('/reply/:id',Authuser,createreply)
router.get('/reply/:id',Authuser,getreply)
router.put('/reply/:id',Authuser,updatereply)
router.delete('/reply/:id',Authuser,deletereply)

export default router;