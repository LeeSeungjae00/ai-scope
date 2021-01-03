import {FILEUPLOAD} from './type'

const initialState = {
    fileData: {
        file : '',
        fileSrc : ''
    },
}


export const Reducer = (state = initialState, action) => {
    switch (action.type) {
        case FILEUPLOAD: return { ...state, 
            fileData : { 
                file : action.payload.file, 
                fileSrc : action.payload.fileSrc}
        };
    }
    return state;
}
export default Reducer

