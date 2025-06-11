"use client"
import { useState } from "react";
import { Button } from "./ui/button"

const Buttons = ({ money, point, item_id} : any) => {

    const [loading, setLoading] = useState(false);

    const handlePurchase = async (type: "money" | "point") => {
        try {
            setLoading(true);

            const data = { type, amount: type === "money" ? money : point, item_id };
            const response = await fetch("/api/user/purchase", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            await response.json();

            if (response.ok) alert("Purchase successful!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full h-auto flex flex-row gap-4">
            {money && <Button variant="outline" className="w-full"
            onClick={() => handlePurchase("money")} disabled={loading}>Rp. {money}</Button>}
            {point && <Button variant="outline" className="w-full"
            onClick={() => handlePurchase("point")} disabled={loading}>{point} Pts</Button>}
        </div>
    )
}

export default Buttons