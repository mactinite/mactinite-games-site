import Link from 'next/link';
function NavButton(props) {
    var children = props.children
    return (
        <Link {...props}>
            <a className="">
                {children}
            </a>
        </Link>
    )
}

export default NavButton;
