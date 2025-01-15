import React, { useState } from "react";


function Home() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="App">
            {/* 상단바 */}
            <div className="navbar flex justify-between p-4 text-black">
                <button
                    onClick={toggleSidebar}
                    className="px-4  rounded hover:bg-gray-300"
                >
                    Sidebar
                </button>
                <button className="px-4 py-2  rounded hover:bg-gray-300">
                    Review
                </button>
                <button className="px-4 py-2  rounded hover:bg-gray-300">
                    Language
                </button>
            </div>

            {/* 메인 레이아웃 */}
            <div className="flex transition-all duration-300 ease-in-out">
                {/* 사이드바 */}
                <div
                    className={`fixed top-0 left-0 h-full bg-gray-200 shadow-lg ${
                        isSidebarOpen ? "w-64" : "w-0"
                    } overflow-hidden transition-all duration-300 ease-in-out`}
                >
                    <div className="p-4">
                        <button
                            onClick={toggleSidebar}
                            className="mb-4 px-4 py-2 text-white rounded hover:bg-gray-300"
                        >
                            Sidebar
                        </button>
                        <p className="mb-4">Menu Item 1</p>
                        <p className="mb-4">Menu Item 2</p>
                        <p className="mb-4">Menu Item 3</p>
                    </div>
                </div>

                {/* 메인 컨텐츠 */}
                <div
                    className={`flex-1 ${
                        isSidebarOpen ? "ml-64" : "ml-0"
                    } transition-all duration-300 ease-in-out`}
                >
                    <div className="p-4">
                        <h4 className="text-lg font-semibold mb-4">
                            AI Language Learning Services for the Upper Level
                        </h4>
                        <div className="search flex mb-4">
                            <input
                                className="flex-1 px-4 py-2 border rounded-l"
                                placeholder="Enter Text"
                            />
                            <button className="px-4 py-2 bg-gray-300 text-white rounded-r ">
                                Search
                            </button>
                        </div>
                        <div className="news grid grid-cols-2 sm:grid-cols-3 gap-2">
                            <button className="px-4 py-2  text-blak rounded hover:bg-gray-300">
                                BBC
                            </button>
                            <button className="px-4 py-2  text-blak rounded hover:bg-gray-300">
                                Le Monde
                            </button>
                            <button className="px-4 py-2  text-blak rounded hover:bg-gray-300">
                                Le Figaro
                            </button>
                            <button className="px-4 py-2  text-blak rounded hover:bg-gray-300">
                                New York Times
                            </button>
                            <button className="px-4 py-2  text-blak rounded hover:bg-gray-300">
                                Tuổi Trẻ
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
