"use client"



export const opportunityImageInit = (opportunityImageInitialState) => {
    const result = {
        ...opportunityImageInitialState, 
        images: [
            {id:1},
            {id:2},
            {id:3},
            {id:4},
        ],
    }
    return result;
}

export const opportunityImageInitialState = {
    images: [],
};


export const opportunityImageReducer = (state, action) => {
    switch(action.type){
        case 'ADD_IMAGE':
            return {
                ...state,
                images: state.images.filter((item) => {
                    if(item.id === action.payload.id) {
                        item.image = action.payload.image;
                        item.src = action.payload.src;
                        if(action.payload.image_id) { item.image_id = action.payload.image_id}
                        return item;
                    } else{
                        return item;
                    }
                })
            } 
       
       
        default:
           return state;
   }
}