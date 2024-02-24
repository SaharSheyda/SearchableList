//data content
const data = [
    {
      id: "1",
      key: "POS_newsite_launching",
      processID: "1945311",
      flowName: "فرآیند امکان سنجی و راه اندازی کاندید سایت /تست کامران -رضا",
      currentTaskName: "کنترل حقوقی پیش قرارداد سایت",
      processState: {
        key: "COMPLETED"
      },
      variables: {
        relation_employee_name: "آقای کامران گیلک",
        relation_name: "کامران",
        relation_priority: "important",
      },
      processStartTime: "1402/10/02 10:15:26",
      processEndTime: "1402/10/05 10:15:26",
      details: {
        title: "آپادانا",
        priority: "P1",
        id: "000291425",
        state: "INITIAL",
        floor: 5,
        code: "52",
        ring: {
          name: "Ring 1"
        }
      }
    },
    {
      id: "2",
      key: "POS_tower_feasibility",
      processID: "1945312",
      flowName: "امکان‌سنجی و راه‌اندازی سرویس برج و مجتمع",
      currentTaskName: "آماده‌سازی اقلام مصرفی",
      processState: {
        key: "COMPLETED"
      },
      variables: {
        relation_employee_name: "آقای کامران گیلک",
      },
      processStartTime: "1402/10/02 10:15:26",
      details: {
        title: "آپادانا2",
        priority: "P2",
        id: "000291426",
        state: "CONFIRM",
        floor: 5,
        code: "52",
      }
    },
    {
      id: "3",
      key: "POS_tower_feasibility",
      processID: "1945313",
      flowName: "امکان‌سنجی و راه‌اندازی سرویس برج و مجتمع/شناسه محل ارایه سرویس",
      currentTaskName: "",
      processState: {
        key: "EXTERNALLY_TERMINATED"
      },
      variables: {
        relation_employee_name: "شهاب لقایی",
        relation_name: "مشتری اول",
        relation_priority: "normal",
      },
      processEndTime: "1402/10/05 10:15:26",
      details: {
        title: "آپادانا۳",
        priority: "P3",
        id: "000291427",
        state: "CONFIRM",
        floor: 5,
        code: "52",
        ring: {}
      }
    },
    {
      id: "4",
      key: "POS_tower_feasibility",
      processID: "1945314",
      flowName: "امکان‌سنجی و راه‌اندازی سرویس برج و مجتمع/سایت الف",
      currentTaskName: "امکان‌سنجی لینک PTP",
      processState: {
        key: "ACTIVE"
      },
      variables: {},
      processStartTime: "1402/10/02 10:15:26",
      processEndTime: "1402/10/05 10:15:26",
      details: {
        title: "آپادانا4",
        priority: "P4",
        id: "0002914244",
        state: "INITIAL",
        floor: 54,
        code: "44",
        ring: {
          name: "Ring 4"
        }
      }
    },
    {
      id: "5",
      key: "POS_newsite_launching",
      processID: "1945315",
      flowName: "فرآیند امکان سنجی و راه اندازی کاندید سایت /ساختمان دلتا",
      currentTaskName: "نتیجه مذاکره با مالک/ اپراتور",
      processState: {
        key: "ACTIVE"
      },
      variables: {
        relation_employee_name: "راهبر سیستم",
        relation_priority: "normal",
      },
      details: {
        title: "آپادانا5",
        priority: "P5",
        id: "00029142555",
        state: "INITIAL",
        floor: 55,
        code: "55",
        ring: {
          name: "Ring 5"
        }
      }
    },
    {
      id: "6",
      key: "ca_collect_first_place",
      processID: "1945316",
      flowName: "جمع‌آوری",
      currentTaskName: "مشخصات صحیح سیم‌کارت",
      processState: {
        key: "EXTERNALLY_TERMINATED"
      },
      variables: {
        relation_employee_name: "رضا حسینی",
        relation_name: "خانم نورا هاشمی",
        relation_priority: "important",
      },
      details: {
        title: "آپادانا6",
        priority: "P6",
        id: "000291466",
        state: "INITIAL",
        floor: 66,
        code: "66",
      }
    },
  ];

  
  //processStates details
  const processStates = [
    {
      key: "ACTIVE", // color: #fa8c16  background: #fff7e6   border-color: #ffd591
      value: "در حال پیگیری"
    },
    {
      key: "COMPLETED", // color: #52c41a  background: #f6ffed   border-color: #b7eb8f
      value: "خاتمه یافته"
    },
    {
      key: "EXTERNALLY_TERMINATED",  // color: #f5222d  background: #fff1f0   border-color: #ffa39e
      value: "بسته‌شده"
    },
  ];

  //priorties details
  const priorities = [
    {
      key: "important", // color: #f5222d  background: #fff1f0   border-color: #ffa39e
      value: "مهم"
    },
    {
      key: "normal",  // color: #fa8c16  background: #fff7e6   border-color: #ffd591
      value: "معمولی"
    },
  ];

  //flows details
  const flows = [
    {
      value: "POS_newsite_launching",
      label: "فرآیند امکان سنجی و راه اندازی کاندید سایت"
    },
    {
      value: "POS_tower_feasibility",
      label: "امکان‌سنجی و راه‌اندازی سرویس برج و مجتمع"
    },
    {
      value: "ca_collect_first_place",
      label: "جمع‌آوری"
    },
  ];

  // Function to get process state values
const getProcessStateValue = (key) => {
  const state = processStates.find((state) => state.key === key);
  return state ? state.value : 'Unknown';
};

// Function to get process state's CSS class
const getProcessStateClass = (key) => {
  switch (key) {
    case "ACTIVE":
      return "state-active";
    case "COMPLETED":
      return "state-completed";
    case "EXTERNALLY_TERMINATED":
      return "state-externally-terminated";
    default:
      return "";
  }
};

// Function to get priority value
const getPriorityValue = (key) => {
  const priority = priorities.find((priority) => priority.key === key);
  if (priority) {
    switch (priority.key) {
      case "important":
        return '<span class="priority-important">' + priority.value + '</span>';
      case "normal":
        return '<span class="priority-normal">' + priority.value + '</span>';
      default:
        return priority.value;
    }
  }
  return '';
};
export {data, flows, processStates, priorities, getProcessStateValue, getProcessStateClass, getPriorityValue };