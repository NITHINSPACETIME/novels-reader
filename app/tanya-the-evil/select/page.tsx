import { tanyaVolumes } from "@/data/tanya-the-evil";
import TanyaSelectClient from "./TanyaSelectClient";

export const dynamic = 'force-static';

export default function TanyaSelectPage() {
    return (
        <TanyaSelectClient 
            volumes={tanyaVolumes} 
        />
    );
}
