import React from "react";
import { Link } from "@inertiajs/inertia-react";

import Button from "./Button";

export default function Pagination({ links = [] }) {
    return (
        <div className="flex gap-4">
            {links.map((link, key) => (
                <Link
                    key={key}
                    disabled={!link.active}
                    href={link.url}
                    preserveState
                    preserveScroll
                >
                    <Button
                        disabled={link.active}
                        variant="outline"
                        colorScheme="gray"
                    >
                        <span
                            dangerouslySetInnerHTML={{
                                __html: link.label,
                            }}
                        />
                    </Button>
                </Link>
            ))}
        </div>
    );
}
