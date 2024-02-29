// import { SearchData } from "@/app/types";
// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import type { PayloadAction } from "@reduxjs/toolkit";

// const initialState: SearchData = {
//   data: [],
//   isloading: false,
//   iserror: false,
//   issucess: false,
//   message: null,
//   value: null,
//   searchtype: "images"
// };

// const searchFetch = createAsyncThunk(
//   "search",
//   async ({search, currenttype}, { rejectWithValue }) => {
//     try {
//       const response = await fetch(
//         `https://api.pexels.com/${currenttype === "images" ? "v1" : "videos"}/search?query=${search ? search : "nature"}&per_page=15`,
//         {
//           headers: {
//             "Content-type": "application/json",
//             Authorization:
//               "gNmvSlQY6yU4Z2Z4vmxIkmNI1RhDdA3uonxDMrjP5gfQpqwAhOb89Dba",
//           },
//         }
//       );
//       if (response.status === 200) {
//         return response.json();
//       }
//       throw new Error("Something went wrong");
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );



// export const searchSlice = createSlice({
//   name: "search",
//   initialState,
//   reducers: {
//     changeSearchType: (state, action) => {
//       console.log(searchtype)
//         state.searchtype = action.payload
//     }
//   },
//   extraReducers: (builder) => {
//     builder.addCase(searchFetch.pending, (state, action) => {
//       state.isloading = true;
//     }),
//       builder.addCase(searchFetch.fulfilled, (state, action) => {
//         state.isloading = false;
//         state.data = action.payload;
//         state.issucess = true;
//         state.message = "Successfully searched";
//       }),
//       builder.addCase(searchFetch.rejected, (state, action) => {
//         state.isloading = false;
//         state.issucess = false;
//         state.iserror = true;
//         state.message = action.payload;
//       });
//   },
// });

// export const { changeSearchType } = searchSlice.actions;
// export { searchFetch };
// export default searchSlice.reducer;




import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    data: [],
    isloading: false,   
    error: false,
    success: false,
    searchtype: "images"
}

const searchImages = createAsyncThunk("searchImages", async ({search, currenttype}, { rejectWithValue }) => {
    try{
        const response = await fetch(`https://api.pexels.com/${"v1"}/search?query=${search ? search : "nature"}&per_page=10`, {
            headers: {
                Authorization: "gNmvSlQY6yU4Z2Z4vmxIkmNI1RhDdA3uonxDMrjP5gfQpqwAhOb89Dba"
            }
        });
        const data = await response.json();
        if(response.status === 200){
            return data
        }
        else{
            throw new Error(response)
        }
        
    }
    catch(error){
        return rejectWithValue(error.message)
    }
})

const searchSlice = createSlice({
    name: "search",
    initialState,
    reducers: { 
        changeSearchType: (state, action) => {
          console.log(action.payload);
          
            state.searchtype = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(searchImages.pending, (state, action) => {
            state.isloading = true
        }),
        builder.addCase(searchImages.fulfilled, (state, action) => {
            state.data = action.payload
            state.isloading = false;
            state.success = true
        }),
        builder.addCase(searchImages.rejected, (state, action) => {
            state.error = true
        })
    }
})

export const { changeSearchType } = searchSlice.actions;
export {searchImages};
export default searchSlice.reducer