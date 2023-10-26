import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../state/store';
import { showToast } from '../helpers/methods';
import { useRouter } from 'expo-router';
import { BooksType, setBooks } from '../state/slices/book';

const useAuth = () => {
    const router = useRouter();
    const { books } = useSelector((state: RootState) => state.book);
    const accountInfo = useSelector((state: RootState) => state.accountInfo);
    const dispatch = useDispatch();
    const [formData,setFormData] = useState<BooksType>({genre:'',genreDes:'',author:'',title:'',pages:0,coverPhoto:'',bookId:0});
    const handleChange = (field:string,value:string) => setFormData(v =>({...v, [field] : value}));

    const saveBook = async () => {
        const {author,title,genre,pages,coverPhoto} = formData;
        console.log(formData)
        const bookId = Math.floor(Math.random()*89999+10000000);
        console.log(bookId)
        if(author.length > 2){
            if(title.length > 2){
                dispatch(setBooks([...books,{...formData,bookId}]));
                showToast('Your book has been successfully added');
                router.back();
            }else{
                showToast('Book title is required!')
            }
        }else{
            showToast('Author name is required!')
        }
    }

    return {accountInfo,saveBook,handleChange,formData};
};

export default useAuth;
