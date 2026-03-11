
import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Filter } from "lucide-react";

export default function TaskFilters({ onFilterChange }) {
    const [status, setStatus] = React.useState("all");
    const [priority, setPriority] = React.useState("all");
    const [category, setCategory] = React.useState("all");

    const handleFilterChange = (type, value) => {
        if (type === "status") setStatus(value);
        if (type === "priority") setPriority(value);
        if (type === "category") setCategory(value);
        onFilterChange({ 
            status: type === "status" ? value : status, 
            priority: type === "priority" ? value : priority,
            category: type === "category" ? value : category
        });
    };

    return (
        <div className="flex flex-wrap gap-4 mb-6">
            <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-gray-500" />
                <Select value={status} onValueChange={(value) => handleFilterChange("status", value)}>
                    <SelectTrigger className="w-32">
                        <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="independent">Verified Independent</SelectItem>
                        <SelectItem value="pe_owned">PE Owned</SelectItem>
                        <SelectItem value="unsure">Unsure</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-gray-500" />
                <Select value={priority} onValueChange={(value) => handleFilterChange("priority", value)}>
                    <SelectTrigger className="w-32">
                        <SelectValue placeholder="Priority" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Priority</SelectItem>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-gray-500" />
                <Select value={category} onValueChange={(value) => handleFilterChange("category", value)}>
                    <SelectTrigger className="w-32">
                        <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                        <SelectItem value="work">Work</SelectItem>
                        <SelectItem value="personal">Personal</SelectItem>
                        <SelectItem value="shopping">Shopping</SelectItem>
                        <SelectItem value="health">Health</SelectItem>
                        <SelectItem value="learning">Learning</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </div>
    );
}
