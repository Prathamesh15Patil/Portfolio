import React from 'react';

function FooterActionButton({ label, href, download, target, rel }) {
    return (
        <a
            href={href}
            {...(download ? { download: download === true ? "" : download } : {})}
            {...(target ? { target, rel } : {})}
            className="
                font-pixel text-[10px] sm:text-xs
                bg-white hover:bg-yellow-100
                border-2 border-zinc-800
                px-3 py-2 sm:px-5 sm:py-2.5
                rounded-[2px]
                font-bold text-zinc-800
                transition-all duration-100
                shadow-[3px_3px_0px_rgba(0,0,0,1)]
                hover:shadow-[4px_4px_0px_rgba(0,0,0,1)]
                hover:-translate-y-0.5
                active:shadow-none
                active:translate-x-[3px]
                active:translate-y-[3px]
                cursor-pointer
                select-none
                whitespace-nowrap
                no-underline
            "
            style={{ textDecoration: 'none', color: 'inherit' }}
        >
            {label}
        </a>
    );
}

export default FooterActionButton;
