import { useState } from "react"
import { SkeletonButton } from "../styling/skelton";


function Categories ({props, callBack}) {
    const data = props;
    const [selectedCategory, setSelectedCategory] = useState("All");
    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
        callBack(category);
    };

    return (
        <div className="flex flex-col min-w-[150px] sm:min-w-[200px] md:min-w-60 text-center pt-4 sm:pt-6 p-3 sm:p-5 gap-3 sm:gap-5 shadow-lg hover:cursor-pointer bg-white rounded-lg">
            <p className="font-bold-lg text-xl sm:text-2xl md:text-3xl">Categories</p>
            <nav
                className={selectedCategory==="All" ? "bg-green-400 text-white p-2 rounded-md" : "p-2"}
                onClick={() => handleCategoryClick("All")}
            >
                All
            </nav>
            {data.length > 0 ? data.map((each) => (
                <a
                    onClick={() => handleCategoryClick(each.name)}
                    className={selectedCategory===each.name ? "bg-green-400 text-white p-2 rounded-md" : "p-2 "}
                    key={each.name}
                >
                    {each.name}
                </a>
            )) : (
                Array.from({ length: 8 }).map((_, i) => <SkeletonButton key={i} />)
            )}
        </div>
    )
}

export default Categories
