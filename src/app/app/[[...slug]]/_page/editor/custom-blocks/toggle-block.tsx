// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuShortcut,
//   DropdownMenuTrigger,
// } from "@/components/shadcn-ui/dropdown-menu";
// import { defaultProps } from "@blocknote/core";
// import { createReactBlockSpec } from "@blocknote/react";
// import { MdCancel, MdCheckCircle, MdError, MdInfo } from "react-icons/md";

// export const alertTypes = [
//   {
//     title: "Warning",
//     value: "warning",
//     icon: MdError,
//     color: "#e69819",
//     backgroundColor: {
//       light: "#fff6e6",
//       dark: "#805d20",
//     },
//   },
//   {
//     title: "Error",
//     value: "error",
//     icon: MdCancel,
//     color: "#d80d0d",
//     backgroundColor: {
//       light: "#ffe6e6",
//       dark: "#802020",
//     },
//   },
//   {
//     title: "Info",
//     value: "info",
//     icon: MdInfo,
//     color: "#507aff",
//     backgroundColor: {
//       light: "#e6ebff",
//       dark: "#203380",
//     },
//   },
//   {
//     title: "Success",
//     value: "success",
//     icon: MdCheckCircle,
//     color: "#0bc10b",
//     backgroundColor: {
//       light: "#e6ffe6",
//       dark: "#208020",
//     },
//   },
// ] as const;

// // The Alert block.
// export const Alert = createReactBlockSpec(
//   {
//     type: "alert",
//     propSchema: {
//       textAlignment: defaultProps.textAlignment,
//       textColor: defaultProps.textColor,
//       type: {
//         default: "warning",
//         values: ["warning", "error", "info", "success"],
//       },
//     },
//     content: "inline",
//   },
//   {
//     render: (props) => {
//       const alertType = alertTypes.find(
//         (a) => a.value === props.block.props.type,
//       )!;
//       const Icon = alertType.icon;
//       return (
//         <div className={"alert"} data-alert-type={props.block.props.type}>
//           {/*Icon which opens a menu to choose the Alert type*/}
//           <DropdownMenu>
//             <DropdownMenuTrigger>
//               <div className={"alert-icon-wrapper"} contentEditable={false}>
//                 <Icon
//                   className={"alert-icon"}
//                   data-alert-icon-type={props.block.props.type}
//                   size={32}
//                 />
//               </div>
//             </DropdownMenuTrigger>
//             {/*Dropdown to change the Alert type*/}
//             <DropdownMenuContent>
//               <DropdownMenuLabel>Alert Type</DropdownMenuLabel>
//               <DropdownMenuSeparator />
//               {alertTypes.map((type) => {
//                 const ItemIcon = type.icon;

//                 return (
//                   <DropdownMenuItem
//                     key={type.value}
//                     onClick={() =>
//                       props.editor.updateBlock(props.block, {
//                         type: "alert",
//                         props: { type: type.value },
//                       })
//                     }
//                   >
//                     {type.title}
//                     <DropdownMenuShortcut>
//                       <ItemIcon
//                         className={"alert-icon"}
//                         data-alert-icon-type={type.value}
//                       />
//                     </DropdownMenuShortcut>
//                   </DropdownMenuItem>
//                 );
//               })}
//             </DropdownMenuContent>
//           </DropdownMenu>
//           {/*Rich text field for user to type in*/}
//           <div className={"inline-content"} ref={props.contentRef} />
//         </div>
//       );
//     },
//   },
// );
