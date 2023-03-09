export const renderTitle = (pathname) => {
    switch (pathname) {
        case "/":
            return "Dashboard";
        case "/login":
            return "Login";
        case "/transaction":
            return "Transaction";
        case "/food":
            return "Food";
        case "/food/create":
            return "Food Create";
        case "/food/update/[id]":
            return "Food Edit";
        case "/user-profile":
            return "Profile";
        case "/category":
            return "Category"
        case "/category/create":
            return "Create Category"
        case "/category/update/[id]":
            return "Update Category"

        default:
            return "Not found";
    }
};
