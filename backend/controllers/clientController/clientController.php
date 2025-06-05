public function __construct()
    {
        $bd = new Database;
        $this->conn = $bd->connect();
        $this->client = new Client($this->conn);
        $this->service = new Service($this->conn);
        $this->appo = new Appointment($this->conn);
        $this->prof = new Professional($this->conn);
        $this->vacat = new Vacation($this->conn);
        $this->dayOff = new DayOff($this->conn);
        $this->avail = new Availability($this->conn);
        $this->emailSender = new EmailSender;
    }